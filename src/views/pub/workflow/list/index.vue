<template>
  <we-table @register="register">
    <template #action="{ record, column }">
      <table-action :actions="handleActions(record, column)" />
    </template>
  </we-table>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { WeTable, useTable, BasicColumn } from '@/components/Table';
  import { getWorkFlowList } from '@/api/workflow';

  import { ActionItem } from '@/components/Table/types/tableAction';

  const columns: BasicColumn[] = [
    {
      title: '工作流名称',
      dataIndex: 'name',
      slots: { customRender: 'name' },
    },
    {
      title: '应用模块',
      dataIndex: 'module',
      slots: { customRender: 'module' },
    },
    {
      title: '修改人',
      dataIndex: 'modifier',
      slots: { customRender: 'modifier' },
    },
    {
      title: '终止环节操作人',
      dataIndex: 'end_operator_names',
      slots: { customRender: 'end_operator_names' },
    },
    {
      title: '更改环节操作人',
      dataIndex: 'change_operator_names',
      slots: { customRender: 'change_operator_names' },
    },
    {
      title: '上次修改时间',
      dataIndex: 'gmt_modified',
      slots: { customRender: 'gmt_modified' },
    },
  ];
  export default defineComponent({
    name: 'PubWorkflowList',
    components: {
      WeTable,
    },
    setup() {
      const [register, { reload }] = useTable({
        title: '工作流列表',
        api: getWorkFlowList,
        useSearchForm: true,
        formConfig: {
          labelWidth: 100,
          formItems: [
            {
              field: `name`,
              label: `姓名`,
              component: 'a-input',
            },
            {
              field: `modifier`,
              label: `修改人`,
              component: 'a-input',
            },
          ],
        },
        columns: columns,
        actionColumn: {
          width: 260,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleEdit(record: any) {
        console.log(record);
      }
      function handleFlowChartDetail(record: any) {
        console.log(record);
      }
      function handleDeployFlowsSatus(record: any) {
        console.log(record);
      }
      function handleDelete(record: any) {
        console.log(record);
      }
      function handleActions(record: any, column: BasicColumn): ActionItem[] {
        return [
          {
            label: '编辑',
            onClick: handleEdit.bind(null, record, column),
          },
          {
            label: '查看流转图',
            onClick: handleFlowChartDetail.bind(null, record, column),
          },
          {
            label: '配置流转状态',
            onClick: handleDeployFlowsSatus.bind(null, record, column),
          },
          {
            label: '删除',
            color: 'error',
            onClick: handleDelete.bind(null, record, column),
          },
        ];
      }
      return { register, reload, handleActions };
    },
  });
</script>
<style lang="less" scoped></style>
