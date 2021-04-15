import type { BasicTableProps, TableActionType, FetchParams, BasicColumn } from '../types/table';
import type { PaginationProps } from '../types/pagination';
import { getDynamicProps, DynamicProps, Nullable } from '@/types/config';
import { ref, onUnmounted, unref, watch, toRaw, WatchStopHandle } from 'vue';
import { FormActionType } from '@/components/Form/types/form';

type Props = Partial<DynamicProps<BasicTableProps>>;
type UseTableMethod = TableActionType & {
  getForm: () => FormActionType;
};
//返回WETable组件的配置
export function useTable(
  tableProps?: Props
): [(instance: TableActionType, formInstance: UseTableMethod) => void, TableActionType] {
  const tableRef = ref<Nullable<TableActionType>>(null);
  const loadedRef = ref<Nullable<boolean>>(false);
  const formRef = ref<Nullable<UseTableMethod>>(null);

  let stopWatch: WatchStopHandle;
  //创建table实例
  function register(instance: TableActionType, formInstance: UseTableMethod) {
    onUnmounted(() => {
      tableRef.value = null;
      loadedRef.value = null;
      formRef.value = null;
    });
    if (unref(loadedRef) && instance === unref(tableRef)) return;

    tableRef.value = instance;
    tableProps && instance.setProps(getDynamicProps(tableProps));
    loadedRef.value = true;
    formRef.value = formInstance;
    stopWatch?.();

    stopWatch = watch(
      () => tableProps,
      () => {
        tableProps && instance.setProps(getDynamicProps(tableProps));
      },
      {
        immediate: true,
        deep: true,
      }
    );
  }

  function getTableInstance(): TableActionType {
    const table = unref(tableRef);
    return table as TableActionType;
  }

  const methods: TableActionType & {
    getForm: () => FormActionType;
  } = {
    reload: async (opt?: FetchParams) => {
      getTableInstance().reload(opt);
    },
    setProps: (props: Partial<BasicTableProps>) => {
      getTableInstance().setProps(props);
    },
    setLoading: (loading: boolean) => {
      getTableInstance().setLoading(loading);
    },
    getDataSource: () => {
      return toRaw(getTableInstance().getDataSource());
    },
    getColumns: ({ ignoreIndex = false }: { ignoreIndex?: boolean } = {}) => {
      const columns = getTableInstance().getColumns({ ignoreIndex }) || [];
      return toRaw(columns);
    },
    setColumns: (columns: BasicColumn[] | string[]) => {
      getTableInstance().setColumns(columns);
    },
    setTableData: (values: any[]) => {
      return getTableInstance().setTableData(values);
    },
    setPagination: (info: Partial<PaginationProps>) => {
      return getTableInstance().setPagination(info);
    },
    getPaginationRef: () => {
      return getTableInstance().getPaginationRef();
    },
    updateTableData: (index: number, key: string, value: any) => {
      return getTableInstance().updateTableData(index, key, value);
    },
    setShowPagination: async (show: boolean) => {
      getTableInstance().setShowPagination(show);
    },
    getShowPagination: () => {
      return toRaw(getTableInstance().getShowPagination());
    },
    getForm: () => {
      return (unref(formRef) as unknown) as FormActionType;
    },
  };

  return [register, methods];
}
