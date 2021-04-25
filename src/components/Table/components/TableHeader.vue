<template>
  <a-row class="table-header">
    <div class="left_container">
      <div class="total">共 {{ totalItem }} 条，已选 {{ selectedCount }} 条</div>
      <div class="button-group">
        <slot name="headerButton"></slot>
      </div>
    </div>
    <div class="right_container">
      <a-tooltip title="刷新表格">
        <a-button @click="reload()">
          <template #icon>
            <svg-icon icon-name="iconSyncOutlined" />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip title="列配置">
        <a-popover placement="bottomLeft" trigger="click">
          <template #content>
            <a-checkbox-group
              v-model:value="checkedList"
              @change="onChange"
              ref="columnListRef"
              class="column_config_checkbox_group"
            >
              <a-checkbox v-for="item in plainOptions" :key="item.value" :value="item.value">
                {{ item.label }}
              </a-checkbox>
            </a-checkbox-group>
          </template>
          <a-button>
            <svg-icon icon-name="iconWE_ProductManageOutlined" />
          </a-button>
        </a-popover>
      </a-tooltip>
      <a-tooltip title="导出数据">
        <a-button @click="exportExcel">
          <svg-icon icon-name="iconDownloadOutlined" />
        </a-button>
      </a-tooltip>
    </div>
  </a-row>
</template>
<script lang="ts">
  import { defineComponent, ref, watchEffect, unref, computed } from 'vue';
  import { useTableContext } from '../hooks/useTableContext';
  import { BasicColumn } from '../types/table';

  interface Options {
    label: string;
    value: string;
    fixed?: boolean | 'left' | 'right';
  }
  export default defineComponent({
    name: 'TableHeader',
    props: {},
    setup() {
      const columnListRef = ref<ComponentRef>(null);
      const table = useTableContext();
      const plainOptions = ref<Options[]>([]);
      const checkedList = ref<string[]>([]);
      const reload = table.reload;
      const totalItem = computed(() => {
        return table.getDataSource().length;
      });
      const selectedCount = computed(() => {
        if (table) {
          return table.getSelectRows().length;
        } else {
          return 0;
        }
      });
      function getColumns() {
        const ret: any = [];
        table.getColumns({ ignoreIndex: true, ignoreAction: true }).forEach((item) => {
          ret.push({
            label: (item.title as string) || (item.customTitle as string),
            value: (item.dataIndex || item.title) as string,
            ...item,
          });
        });
        return ret;
      }
      watchEffect(() => {
        const columns = table.getColumns();
        if (columns.length) {
          init();
        }
      });
      function init() {
        const columns = getColumns();

        const checkList = table
          .getColumns()
          .map((item) => {
            if (item.defaultHidden) {
              return '';
            }
            return item.dataIndex || item.title;
          })
          .filter(Boolean) as string[];

        if (!plainOptions.value.length) {
          plainOptions.value = columns;
        } else {
          unref(plainOptions).forEach((item: BasicColumn) => {
            const findItem = columns.find((col: BasicColumn) => col.dataIndex === item.dataIndex);
            if (findItem) {
              item.fixed = findItem.fixed;
            }
          });
        }
        checkedList.value = checkList;
      }
      function onChange(checkedList: string[]) {
        const sortList = unref(plainOptions).map((item) => item.value);
        checkedList.sort((prev, next) => {
          return sortList.indexOf(prev) - sortList.indexOf(next);
        });
        table.setColumns(checkedList);
      }
      return {
        columnListRef,
        checkedList,
        plainOptions,
        onChange,
        reload,
        selectedCount,
        totalItem,
      };
    },
    methods: {
      exportExcel() {
        console.log('exportExcel');
      },
    },
  });
</script>
<style lang="less">
  .table-header {
    background-color: white;
    padding: 0 24px 24px 24px;
    display: flex;
    div {
      height: 32px;
      line-height: 32px;
      display: inline-block;
    }
    .left_container {
      flex: 1;
      display: flex;
      justify-content: space-between;
      .button-group {
        & > button {
          margin-left: 24px;
        }
      }
    }
    .right_container {
      width: 170px;
      margin-left: 24px;
      display: flex;
      justify-content: space-between;
      .ant-btn {
        border: none;
        color: rgba(0, 0, 0, 0.87);
        background-color: transparent;
        &:hover {
          background: #ffffff;
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
          color: rgba(0, 0, 0, 0.87);
        }
        &:active {
          background: #4885ed;
          color: #ffffff;
        }
        &:visited {
          border: none;
          color: rgba(0, 0, 0, 0.87);
          background-color: transparent;
        }
      }
      .anticon {
        line-height: 32px;
      }
    }
  }
  .column_config_checkbox_group {
    .ant-checkbox-wrapper {
      margin-left: 8px;
      display: block;
    }
  }
</style>
