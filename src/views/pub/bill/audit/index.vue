<template>
  <we-table @register="register" @tab-change="tabChange" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { WeTable, useTable, BasicColumn } from '@/components/Table';
  import { getProgressList } from '@/api/bill';
  import type { BasicTableProps } from '@/components/Table/types/table';

  const columns: BasicColumn[] = [
    {
      title: '开发者名称',
      dataIndex: 'corp_name',
      slots: { customRender: 'corp_name' },
    },
    {
      title: '结算周期',
      dataIndex: 'month',
      slots: { customRender: 'month' },
    },
    {
      title: 'HW结算状态',
      dataIndex: 'hw_status',
      slots: { customRender: 'hw_status' },
    },
    {
      title: '对应合同',
      dataIndex: 'contract_name',
      slots: { customRender: 'contract_name' },
    },
    {
      title: '创建日期',
      dataIndex: 'created_at',
      slots: { customRender: 'created_at' },
    },
    {
      title: 'AM',
      dataIndex: 'am_name',
      slots: { customRender: 'am_name' },
    },
    {
      title: 'BD',
      dataIndex: 'owner_name',
      slots: { customRender: 'owner_name' },
    },
    {
      title: '结算产品数量',
      dataIndex: 'product_count',
      slots: { customRender: 'product_count' },
    },
    {
      title: '收入',
      dataIndex: 'revenue',
      slots: { customRender: 'revenue' },
    },
    {
      title: '支出',
      dataIndex: 'cost',
      slots: { customRender: 'cost' },
    },
    {
      title: '总GP',
      dataIndex: 'gp',
      slots: { customRender: 'gp' },
    },
    {
      title: '分成',
      dataIndex: 'share_amount',
      slots: { customRender: 'share_amount' },
    },
  ];
  export default defineComponent({
    name: 'PubWorkflowList',
    components: {
      WeTable,
    },
    setup() {
      const [register, { reload, setProps }] = useTable({
        title: '工作流列表',
        api: getProgressList,
        tabConfig: {
          tabItems: [
            {
              key: 'finance_confirm',
              tab: '财务审核中',
            },
            {
              key: 'internal_confirm',
              tab: 'Head审核中',
            },
            {
              key: 'external_confirm',
              tab: '外部确认中',
            },
          ],
          activeKey: 'finance_confirm',
          searchField: 'category',
        },
        columns: columns,
      });
      return { register, reload, setProps };
    },
    methods: {
      tabChange(val: string) {
        console.log(val);
        let props: BasicTableProps = {
          columns: [
            {
              title: '开发者名称',
              dataIndex: 'corp_name',
              slots: { customRender: 'corp_name' },
            },
            {
              title: '结算周期',
              dataIndex: 'month',
              slots: { customRender: 'month' },
            },
            {
              title: 'HW结算状态',
              dataIndex: 'hw_status',
              slots: { customRender: 'hw_status' },
            },
            {
              title: '对应合同',
              dataIndex: 'contract_name',
              slots: { customRender: 'contract_name' },
            },
            {
              title: '创建日期',
              dataIndex: 'created_at',
              slots: { customRender: 'created_at' },
            },
          ],
        };
        this.setProps(props);
        this.reload();
      },
    },
  });
</script>
<style lang="less" scoped></style>
