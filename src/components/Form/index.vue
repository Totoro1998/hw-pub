<template>
  <a-form ref="formElRef" v-bind="{ ...$attrs, ...$props }" :model="formState">
    <a-row>
      <template v-for="formItem in getFormItems" :key="formItem.field">
        <we-form-item :formItem="formItem" :formState="formState" :setFormModel="setFormModel" />
      </template>
    </a-row>
  </a-form>
</template>
<script lang="ts">
  import { defineComponent, computed, unref, reactive, ref, Ref, onMounted } from 'vue';
  import { Recordable } from '@/types/config';
  import { FormItem, FormProps, FormActionType } from './types/form';
  import WeFormItem from './components/WeFormItem.vue';
  import { useFormEvents } from './hooks/useFormEvents';
  import { Nullable } from '@/types/config';
  import cloneDeep from 'lodash/cloneDeep';
  import merge from 'lodash/merge';
  import { formBasicProps } from './props';

  export default defineComponent({
    name: 'WeForm',
    components: {
      WeFormItem,
    },
    props: formBasicProps,
    emits: ['register', 'advanced-change', 'reset'],
    setup(props, { emit }) {
      const formState = reactive<Recordable>({});
      const propsRef = ref<Partial<FormProps>>({});
      const formElRef = ref<Nullable<FormActionType>>(null);
      const formItemsRef = ref<Nullable<FormItem[]>>(null);
      const getFormItems = computed((): FormItem[] => {
        const formItems: FormItem[] = unref(formItemsRef) || (unref(getProps).formItems as any);
        return formItems as FormItem[];
      });
      const getProps = computed(
        (): FormProps => {
          return { ...props, ...unref(propsRef) } as FormProps;
        }
      );
      const { getFieldsValue, resetFields } = useFormEvents({
        emit,
        getProps,
        formState,
        formElRef: formElRef as Ref<FormActionType>,
      });
      async function setProps(formProps: Partial<FormProps>): Promise<void> {
        propsRef.value = merge(cloneDeep(unref(propsRef) || {}), cloneDeep(formProps));
      }

      function setFormModel(key: string, value: any) {
        formState[key] = value;
      }
      const formAction: Partial<FormActionType> = {
        getFieldsValue,
        resetFields,
        setProps,
      };

      onMounted(() => {
        emit('register', formAction);
      });
      return {
        formState,
        getFormItems,
        setFormModel,
      };
    },
  });
</script>
<style lang="less" scoped></style>
