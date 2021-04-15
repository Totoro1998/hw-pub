<template>
  <a-form-item name="">
    <component :is="formItem.component" v-bind="{ ...compAttr }" />
  </a-form-item>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { FormItem } from '../types/form';
  import { Recordable, Nullable } from '@/types/config';
  import upperFirst from 'lodash/upperFirst';
  export default defineComponent({
    name: 'WeFormItem',
    inheritAttrs: false,
    props: {
      formItem: {
        type: Object as PropType<FormItem>,
        default: () => {},
      },
      setFormModel: {
        type: Function as PropType<(key: string, value: any) => void>,
        default: null,
      },
      formState: {
        type: Object as PropType<Recordable>,
        default: {},
      },
    },
    setup(props) {
      const { field, changeEvent = 'change', valueField, componentProps } = props.formItem;
      const eventKey = `on${upperFirst(changeEvent)}`;
      const bindValue: Recordable = {
        [valueField || 'value']: props.formState[field],
      };
      const on = {
        [eventKey]: (e: Nullable<Recordable>) => {
          const target = e ? e.target : null;
          const value = target ? target.value : e;
          props.setFormModel(field, value);
        },
      };
      const compAttr: Recordable = {
        ...on,
        ...bindValue,
        ...componentProps,
      };
      return {
        compAttr,
      };
    },
  });
</script>
<style lang="less" scoped></style>
