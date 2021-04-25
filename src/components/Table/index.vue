<template>
  <div ref="wrapRef">
    <a-tabs
      v-if="tabConfigRef && tabConfigRef.tabItems && tabConfigRef.tabItems.length !== 0"
      v-model:activeKey="tabConfigRef.activeKey"
    >
      <a-tab-pane v-for="item in tabConfigRef.tabItems" :key="item.key" :tab="item.tab" />
    </a-tabs>
    <table-search-form
      v-if="getBindValues.useSearchForm"
      v-bind="getFormProps"
      :reload="tableAction.reload"
      @register="registerForm"
    />
    <table-header>
      <template #headerButton>
        <slot name="headerButton"> </slot>
      </template>
    </table-header>
    <!-- <table-header /> -->
    <a-table
      ref="tableElRef"
      v-bind="getBindValues"
      v-show="getEmptyDataIsShowTable"
      @change="handleTableChange"
    >
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data"></slot>
      </template>

      <template #[`header-${column.dataIndex}`] v-for="column in columns" :key="column.dataIndex">
        <HeaderCell :column="column" />
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
  import type { BasicTableProps, TableActionType } from './types/table';
  import { FormItem } from './types/form';
  import { defineComponent, ref, computed, unref, toRaw } from 'vue';
  import HeaderCell from './components/HeaderCell.vue';
  import TableHeader from './components/TableHeader.vue';
  import TableSearchForm from './components/TableSearchForm.vue';
  import { usePagination } from './hooks/usePagination';
  import { useColumns } from './hooks/useColumns';
  import { useDataSource } from './hooks/useDataSource';
  import { useLoading } from './hooks/useLoading';
  import { useTabs } from './hooks/useTabs';
  import { useTableForm } from './hooks/useTableForm';
  import { useRowSelection } from './hooks/useRowSelection';
  import omit from 'lodash/omit';
  import { basicProps } from './props';
  import { createTableContext } from './hooks/useTableContext';

  export default defineComponent({
    name: 'WeTable',
    components: {
      HeaderCell,
      TableHeader,
      TableSearchForm,
    },
    props: basicProps,
    emits: ['fetch-success', 'fetch-error', 'register', 'tab-change', 'selection-change'],
    setup(props, { attrs, emit, slots }) {
      const tableElRef = ref<ComponentRef>(null);
      const tableData = ref<Recordable[]>([]);

      const wrapRef = ref<Nullable<HTMLDivElement>>(null);
      const innerPropsRef = ref<Partial<BasicTableProps>>();

      const getProps = computed(() => {
        return { ...props, ...unref(innerPropsRef) } as BasicTableProps;
      });
      const getFormProps = computed(
        (): Partial<{ formItems: FormItem[] }> => {
          const { formItems } = unref(getProps);
          return {
            formItems,
          };
        }
      );
      const { getLoading, setLoading } = useLoading(getProps);
      const { setPagination, getPaginationRef } = usePagination(getProps);
      const [registerForm, formActions] = useTableForm();
      const {
        getRowSelectionRef,
        getSelectRows,
        clearSelectedRowKeys,
        getSelectRowKeys,
      } = useRowSelection(getProps, emit);
      const {
        setTableData,
        getDataSource,
        handleTableChange,
        getDataSourceRef,
        updateTableData,
        getRowKey,
        reload,
      } = useDataSource(
        getProps,
        {
          tableData,
          getPaginationRef,
          setPagination,
          setLoading,
          getFieldsValue: formActions.getFieldsValue,
        },
        emit
      );

      const { getViewColumns, getColumns, setColumns } = useColumns(getProps, getPaginationRef);
      const { tabConfigRef } = useTabs(getProps, emit);

      const getBindValues = computed(() => {
        const dataSource = toRaw(unref(getDataSourceRef));
        let propsData: Recordable = {
          size: 'middle',
          ...attrs,
          useSearchForm: unref(getProps).useSearchForm,
          loading: unref(getLoading),
          tableLayout: 'fixed',
          rowKey: unref(getRowKey),
          columns: toRaw(unref(getViewColumns)),
          rowSelection: unref(getRowSelectionRef),
          pagination: toRaw(unref(getPaginationRef)),
          dataSource,
        };
        if (slots.expandedRowRender) {
          propsData = omit(propsData, 'scroll');
        }
        propsData = omit(propsData, 'class');
        return propsData;
      });
      const getEmptyDataIsShowTable = computed(() => {
        const { emptyDataIsShowTable, useSearchForm } = unref(getProps);
        if (emptyDataIsShowTable || !useSearchForm) {
          return true;
        }
        return !!unref(getDataSourceRef).length;
      });
      function setProps(props: Partial<BasicTableProps>) {
        innerPropsRef.value = { ...unref(innerPropsRef), ...props };
      }
      const tableAction: TableActionType = {
        reload,
        setTableData,
        getColumns,
        setColumns,
        getDataSource,
        setProps,
        updateTableData,
        getSelectRows,
        clearSelectedRowKeys,
        getSelectRowKeys,
      };
      createTableContext({ ...tableAction, wrapRef, getBindValues });

      emit('register', tableAction);
      return {
        tabConfigRef,
        getBindValues,
        getEmptyDataIsShowTable,
        handleTableChange,
        tableElRef,
        getLoading,
        wrapRef,
        tableAction,
        getFormProps,
        registerForm,
        columns: getViewColumns,
      };
    },
  });
</script>
<style lang="less"></style>
