<template>
  <div ref="wrapRef">
    <a-tabs
      v-if="tabConfigRef && tabConfigRef.tabItems && tabConfigRef.tabItems.length !== 0"
      v-model:activeKey="tabConfigRef.activeKey"
    >
      <a-tab-pane v-for="item in tabConfigRef.tabItems" :key="item.key" :tab="item.tab" />
    </a-tabs>
    <we-form v-if="getBindValues.useSearchForm" v-bind="getFormProps" @register="registerForm" />
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
  import type { BasicTableProps } from './types/table';
  import { Recordable, Nullable } from '@/types/config';
  import { FormProps } from '@/components/Form/types/form';
  import { defineComponent, ref, computed, unref, toRaw } from 'vue';
  import HeaderCell from './components/HeaderCell.vue';
  import { usePagination } from './hooks/usePagination';
  import { useColumns } from './hooks/useColumns';
  import { useDataSource } from './hooks/useDataSource';
  import { useLoading } from './hooks/useLoading';
  import { useTabs } from './hooks/useTabs';
  import { useForm } from '@/components/Form';
  import omit from 'lodash/omit';
  import { basicProps } from './props';
  import { ComponentRef } from '@/types/config';
  import { createTableContext } from './hooks/useTableContext';

  export default defineComponent({
    components: {
      HeaderCell,
    },
    // props: {
    //   clickToRowSelect: {
    //     type: Boolean,
    //     default: true,
    //   },
    // },
    props: basicProps,
    emits: ['fetch-success', 'fetch-error', 'register', 'tab-change'],
    setup(props, { attrs, emit, slots }) {
      const tableElRef = ref<ComponentRef>(null);
      const tableData = ref<Recordable[]>([]);

      const wrapRef = ref<Nullable<HTMLDivElement>>(null);
      const innerPropsRef = ref<Partial<BasicTableProps>>();

      const getProps = computed(() => {
        return { ...props, ...unref(innerPropsRef) } as BasicTableProps;
      });
      const getFormProps = computed(
        (): Partial<FormProps> => {
          const { formConfig } = unref(getProps);
          return {
            ...formConfig,
          };
        }
      );
      const { getLoading, setLoading } = useLoading(getProps);
      const { getPaginationInfo, setPagination } = usePagination(getProps);
      const [registerForm, formActions] = useForm();

      const { handleTableChange, getDataSourceRef, getRowKey, reload } = useDataSource(
        getProps,
        {
          tableData,
          getPaginationInfo,
          setPagination,
          setLoading,
          getFieldsValue: formActions.getFieldsValue,
        },
        emit
      );

      const { getViewColumns } = useColumns(getProps, getPaginationInfo);
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
          pagination: toRaw(unref(getPaginationInfo)),
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
      const tableAction: any = {
        reload,
        setProps,
      };

      createTableContext({ ...tableAction, wrapRef, getBindValues });

      emit('register', tableAction, formActions);
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
