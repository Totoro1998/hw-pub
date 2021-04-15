import type { ComputedRef, Ref } from 'vue';
import type { FormProps, FormActionType } from '../types/form';
import { unref, toRaw } from 'vue';
import isFunction from 'lodash/isFunction';
import { EmitType, Recordable } from '@/types/config';

interface UseFormActionContext {
  emit: EmitType;
  getProps: ComputedRef<FormProps>;
  formState: Recordable;
  formElRef: Ref<FormActionType>;
}
export function useFormEvents({ emit, getProps, formState, formElRef }: UseFormActionContext) {
  async function resetFields(): Promise<void> {
    const { resetFunc } = unref(getProps);
    resetFunc && isFunction(resetFunc) && (await resetFunc());
    const formEl = unref(formElRef);
    if (!formEl) return;

    Object.keys(formState).forEach((key) => {
      formState[key] = '';
    });
    emit('reset', toRaw(formState));
  }
  function getFieldsValue(): Recordable {
    const formEl = unref(formElRef);
    if (!formEl) return {};
    return toRaw(unref(formState));
  }
  return {
    getFieldsValue,
    resetFields,
  };
}
