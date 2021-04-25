import type { BasicTableProps, TableRowSelection } from '../types/table';

import { computed, ref, unref, ComputedRef } from 'vue';
export function useRowSelection(propsRef: ComputedRef<BasicTableProps>, emit: EmitType) {
  const selectedRowKeysRef = ref<string[]>([]);
  const selectedRowRef = ref<Recordable[]>([]);

  const getRowSelectionRef = computed((): TableRowSelection | null => {
    const { rowSelection } = unref(propsRef);
    if (!rowSelection) {
      return null;
    }

    return {
      selectedRowKeys: unref(selectedRowKeysRef),
      hideDefaultSelections: false,
      onChange: (selectedRowKeys: string[], selectedRows: Recordable[]) => {
        selectedRowKeysRef.value = selectedRowKeys;
        selectedRowRef.value = selectedRows;
        emit('selection-change', {
          keys: selectedRowKeys,
          rows: selectedRows,
        });
      },
      ...(rowSelection === undefined ? {} : rowSelection),
    };
  });

  function setSelectedRows(rows: Recordable[]) {
    selectedRowRef.value = rows;
  }

  function clearSelectedRowKeys() {
    selectedRowRef.value = [];
    selectedRowKeysRef.value = [];
  }

  function getSelectRowKeys() {
    return unref(selectedRowKeysRef);
  }

  function getSelectRows<T = Recordable>() {
    // const ret = toRaw(unref(selectedRowRef)).map((item) => toRaw(item));
    return unref(selectedRowRef) as T[];
  }

  return {
    getRowSelectionRef,
    getSelectRows,
    getSelectRowKeys,
    clearSelectedRowKeys,
    setSelectedRows,
  };
}
