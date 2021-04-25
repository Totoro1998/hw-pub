<template>
  <div class="table_form_container">
    <div class="form_container">
      <a-form ref="TableSearchFormElRef" :model="formState">
        <a-row :gutter="8">
          <a-col
            class="form_item_col"
            v-for="(item, index) in formItems"
            :span="item.componentType === 'a-range-picker' ? 12 : 6"
            :key="item.field"
            v-show="index < count"
          >
            <a-form-item>
              <component :is="item.componentType" v-bind="{ ...getComponentAttr(item) }" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="buttons_container">
      <a-button @click="toggleExpand" v-if="formItems.length > 4">
        <template #icon>
          <svg-icon :icon-name="expand ? 'iconWE_DoubleUpOutlined' : 'iconWE_DoubleUpDown'" />
        </template>
        {{ expand ? '收起' : '展开' }}
      </a-button>
      <a-button @click="resetFields" class="reset_button">清空</a-button>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, computed, onMounted, toRaw, unref, PropType } from 'vue';
  import { FormActionType, FormItem } from '../types/form';
  import { useForm } from '@ant-design-vue/use';
  import { debouncedWatch } from '@vueuse/core';
  import upperFirst from 'lodash-es/upperFirst';
  export default defineComponent({
    name: 'TableSearchForm',
    emits: ['register'],
    props: {
      formItems: {
        type: Array as PropType<FormItem[]>,
        default: () => [],
      },
      reload: {
        type: Function,
        default: null,
      },
    },
    setup(props, { emit }) {
      const TableSearchFormElRef = ref<Nullable<FormActionType>>(null);
      const formState = reactive<Recordable>({});
      // useForm需要使用
      const rulesRef = reactive({});
      const expand = ref<Boolean>(false);
      const count = computed(() => {
        return expand.value ? props.formItems.length : 4;
      });
      const toggleExpand = function () {
        expand.value = !expand.value;
      };
      const { resetFields } = useForm(formState, rulesRef);
      const getComponentAttr = function (item: any) {
        const { field, changeEvent = 'change', componentProps } = item;
        const eventKey = `on${upperFirst(changeEvent)}`;
        const bindValue: Recordable = {
          ['value']: formState[field],
        };
        const on = {
          [eventKey]: (e: Nullable<Recordable>) => {
            const target = e ? e.target : null;
            const value = target ? target.value : e;
            formState[field] = value;
          },
        };
        const compAttr: Recordable = {
          ...on,
          ...bindValue,
          ...componentProps,
        };
        return compAttr;
      };
      function getFieldsValue(): Recordable {
        return toRaw(unref(formState));
      }
      const formAction: Partial<FormActionType> = {
        getFieldsValue,
      };
      onMounted(() => {
        emit('register', formAction);
      });
      debouncedWatch(
        () => unref(formState),
        () => {
          props.reload();
        },
        {
          debounce: 500,
          deep: true,
        }
      );
      return {
        formState,
        TableSearchFormElRef,
        getComponentAttr,
        resetFields,
        count,
        toggleExpand,
        expand,
      };
    },
  });
</script>
<style lang="less">
  .table_form_container {
    display: flex;
    padding: 24px 24px 16px 24px;
    background-color: #ffffff;
    .form_container {
      flex: 1;
    }
    .form_item_col {
      margin-bottom: 8px;
    }
    .buttons_container {
      width: 170px;
      display: flex;
      margin-left: 24px;
      justify-content: space-between;
      .reset_button {
        border: 1px solid #4885ed;
        color: #4885ed;
      }
    }
    .ant-form-item {
      margin: 0;
    }
    .ant-form-item-control {
      line-height: 32px;
      height: 32px;
    }
    .ant-col.ant-form-item-control-wrapper {
      width: 100%;
    }
  }
</style>
