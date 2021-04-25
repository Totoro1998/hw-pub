import { ref, onUnmounted, unref } from 'vue';
import type { FormActionType } from '../types/form';
export type RegisterFn = (formInstance: FormActionType) => void;

export type UseFormReturnType = [RegisterFn, FormActionType];
export function useTableForm(): UseFormReturnType {
  const TableSearchFormElRef = ref<Nullable<FormActionType>>(null);
  const loadedRef = ref<Nullable<boolean>>(false);

  function register(instance: FormActionType) {
    onUnmounted(() => {
      TableSearchFormElRef.value = null;
      loadedRef.value = null;
    });
    if (unref(loadedRef) && instance === unref(TableSearchFormElRef)) return;

    TableSearchFormElRef.value = instance;
    loadedRef.value = true;
  }
  const methods: FormActionType = {
    getFieldsValue: <T>() => {
      return unref(TableSearchFormElRef)?.getFieldsValue() as T;
    },
  };

  return [register, methods];
}
