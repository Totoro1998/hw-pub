import type { BasicTableProps, TableActionType, FetchParams, BasicColumn } from '../types/table';
import { ref, onUnmounted, unref, watch, toRaw, WatchStopHandle } from 'vue';
import { DynamicProps } from '@/types/config';
import { getDynamicProps } from '@/utils/common';

type Props = Partial<DynamicProps<BasicTableProps>>;
type UseTableMethod = TableActionType;
//返回WeTable组件的配置
export function useTable(
  tableProps?: Props
): [(instance: TableActionType, formInstance: TableActionType) => void, TableActionType] {
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

  const methods: TableActionType = {
    reload: async (opt?: FetchParams) => {
      getTableInstance().reload(opt);
    },
    setProps: (props: Partial<BasicTableProps>) => {
      getTableInstance().setProps(props);
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
    updateTableData: (index: number, key: string, value: any) => {
      return getTableInstance().updateTableData(index, key, value);
    },
    getSelectRowKeys: () => {
      return toRaw(getTableInstance().getSelectRowKeys());
    },
    getSelectRows: () => {
      return toRaw(getTableInstance().getSelectRows());
    },
    clearSelectedRowKeys: () => {
      getTableInstance().clearSelectedRowKeys();
    },
  };
  return [register, methods];
}
