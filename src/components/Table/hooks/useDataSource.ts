import type { BasicTableProps, FetchParams, SorterResult } from '../types/table';
import type { PaginationProps } from '../types/pagination';

import {
  ref,
  unref,
  ComputedRef,
  computed,
  onMounted,
  watch,
  reactive,
  Ref,
  watchEffect,
} from 'vue';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import isBoolean from 'lodash/isBoolean';
import cloneDeep from 'lodash/cloneDeep';
import uniqueId from 'lodash/uniqueId';
import { PAGE_SIZE, ROW_KEY } from '../const';
interface ActionType {
  getPaginationRef: ComputedRef<boolean | PaginationProps>;
  setPagination: (info: Partial<PaginationProps>) => void;
  tableData: Ref<Recordable[]>;
  setLoading: (loading: boolean) => void;
  getFieldsValue: () => Recordable;
}

interface SearchState {
  sortInfo: Recordable;
  filterInfo: Record<string, string[]>;
}
export function useDataSource(
  propsRef: ComputedRef<BasicTableProps>,
  { getPaginationRef, setPagination, tableData, setLoading, getFieldsValue }: ActionType,
  emit: EmitType
) {
  const searchState = reactive<SearchState>({
    sortInfo: {},
    filterInfo: {},
  });
  const dataSourceRef = ref<Recordable[]>([]);

  watchEffect(() => {
    tableData.value = unref(dataSourceRef);
  });

  watch(
    () => unref(propsRef).dataSource,
    () => {
      const { dataSource, api } = unref(propsRef);
      !api && dataSource && (dataSourceRef.value = dataSource);
    },
    {
      immediate: true,
    }
  );

  function handleTableChange(
    pagination: PaginationProps,
    filters: Partial<Recordable<string[]>>,
    sorter: SorterResult
  ) {
    const { sortFn, filterFn } = unref(propsRef);
    setPagination(pagination);

    const params: Recordable = {};
    if (sorter && isFunction(sortFn)) {
      const sortInfo = sortFn(sorter);
      searchState.sortInfo = sortInfo;
      params.sortInfo = sortInfo;
    }

    if (filters && isFunction(filterFn)) {
      const filterInfo = filterFn(filters);
      searchState.filterInfo = filterInfo;
      params.filterInfo = filterInfo;
    }
    fetch(params);
  }

  function setTableKey(items: any[]) {
    if (!items || !Array.isArray(items)) return;
    items.forEach((item) => {
      if (!item[ROW_KEY]) {
        item[ROW_KEY] = uniqueId();
      }
      if (item.children && item.children.length) {
        setTableKey(item.children);
      }
    });
  }

  const getAutoCreateKey = computed(() => {
    return unref(propsRef).autoCreateKey && !unref(propsRef).rowKey;
  });

  const getRowKey = computed(() => {
    const { rowKey } = unref(propsRef);
    return unref(getAutoCreateKey) ? ROW_KEY : rowKey;
  });

  const getDataSourceRef = computed(() => {
    const dataSource = unref(dataSourceRef);
    if (!dataSource || dataSource.length === 0) {
      return [];
    }
    if (unref(getAutoCreateKey)) {
      const firstItem = dataSource[0];
      const lastItem = dataSource[dataSource.length - 1];

      if (firstItem && lastItem) {
        if (!firstItem[ROW_KEY] || !lastItem[ROW_KEY]) {
          const data = cloneDeep(unref(dataSourceRef));
          data.forEach((item) => {
            if (!item[ROW_KEY]) {
              item[ROW_KEY] = uniqueId();
            }
            if (item.children && item.children.length) {
              setTableKey(item.children);
            }
          });
          dataSourceRef.value = data;
        }
      }
    }
    return unref(dataSourceRef);
  });

  async function updateTableData(index: number, key: string, value: any) {
    const record = dataSourceRef.value[index];
    if (record) {
      dataSourceRef.value[index][key] = value;
    }
    return dataSourceRef.value[index];
  }

  async function fetch(opt?: FetchParams) {
    setLoading(true);

    const { api, searchInfo, fetchSetting, pagination, tabConfig, useSearchForm } = unref(propsRef);
    if (!api || !isFunction(api)) {
      return;
    }
    try {
      const {
        pageField,
        sizeField,
        listField,
        totalField,
        orderByField,
        orderField,
      } = fetchSetting || {
        pageField: 'page',
        sizeField: 'rowsPerPage',
        listField: 'items',
        totalField: 'total',
        orderByField: 'order_by',
        orderField: 'order',
      };
      let pageParams: Recordable = {};
      const tabField: Recordable = {};
      const { current = 1, rowsPerPage = PAGE_SIZE } = unref(getPaginationRef) as PaginationProps;

      if ((isBoolean(pagination) && !pagination) || isBoolean(getPaginationRef)) {
        pageParams = {};
      } else {
        pageParams['name'] = '';
        pageParams[pageField] = (opt && opt.page) || current;
        pageParams[sizeField] = rowsPerPage;
        pageParams[orderByField] = '';
        pageParams[orderField] = 'asc';
      }
      if (tabConfig?.searchField) {
        tabField[tabConfig.searchField] = tabConfig.activeKey;
      }
      const { sortInfo = {}, filterInfo } = searchState;
      const params: Recordable = {
        ...pageParams,
        ...tabField,
        ...searchInfo,
        ...(useSearchForm ? getFieldsValue() : {}),
        ...(opt?.searchInfo ?? {}),
        ...sortInfo,
        ...filterInfo,
        ...(opt?.sortInfo ?? {}),
        ...(opt?.filterInfo ?? {}),
      };
      const res = await api(params);

      const isArrayResult = Array.isArray(res);

      const resultItems: Recordable[] = isArrayResult ? res : get(res, listField);
      const resultTotal: number = isArrayResult ? 0 : get(res, totalField);
      // 假如数据变少，导致总页数变少并小于当前选中页码，通过getPaginationRef获取到的页码是不正确的，需获取正确的页码再次执行
      if (resultTotal) {
        const currentTotalPage = Math.ceil(resultTotal / rowsPerPage);
        if (current > currentTotalPage) {
          setPagination({
            current: currentTotalPage,
          });
          fetch(opt);
        }
      }
      dataSourceRef.value = resultItems;
      setPagination({
        total: resultTotal || 0,
      });
      if (opt && opt.page) {
        setPagination({
          current: opt.page || 1,
        });
      }
      emit('fetch-success', {
        items: unref(resultItems),
        total: resultTotal,
      });
    } catch (error) {
      emit('fetch-error', error);
      dataSourceRef.value = [];
      setPagination({
        total: 0,
      });
    } finally {
      setLoading(false);
    }
  }

  function setTableData<T = Recordable>(values: T[]) {
    dataSourceRef.value = values;
  }

  function getDataSource<T = Recordable>() {
    return getDataSourceRef.value as T[];
  }

  async function reload(opt?: FetchParams) {
    await fetch(opt);
  }

  onMounted(() => {
    unref(propsRef).immediate && fetch();
  });

  return {
    getDataSourceRef,
    getDataSource,
    getRowKey,
    setTableData,
    getAutoCreateKey,
    fetch,
    reload,
    updateTableData,
    handleTableChange,
  };
}
