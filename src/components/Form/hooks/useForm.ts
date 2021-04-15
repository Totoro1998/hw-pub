import { ref, onUnmounted, unref, nextTick, watch } from 'vue';
import type { FormProps, FormActionType } from '../types/form';
import { getDynamicProps, DynamicProps, Nullable } from '@/types/config';

type Props = Partial<DynamicProps<FormProps>>;

export type RegisterFn = (formInstance: FormActionType) => void;

export type UseFormReturnType = [RegisterFn, FormActionType];
export function useForm(props?: Props): UseFormReturnType {
  const formRef = ref<Nullable<FormActionType>>(null);
  const loadedRef = ref<Nullable<boolean>>(false);

  async function getForm() {
    const form = unref(formRef);
    await nextTick();
    return form as FormActionType;
  }

  function register(instance: FormActionType) {
    onUnmounted(() => {
      formRef.value = null;
      loadedRef.value = null;
    });
    if (unref(loadedRef) && instance === unref(formRef)) return;

    formRef.value = instance;
    loadedRef.value = true;

    watch(
      () => props,
      () => {
        props && instance.setProps(getDynamicProps(props));
      },
      {
        immediate: true,
        deep: true,
      }
    );
  }

  const methods: FormActionType = {
    setProps: async (formProps: Partial<FormProps>) => {
      const form = await getForm();
      form.setProps(formProps);
    },
    resetFields: async () => {
      getForm().then(async (form) => {
        await form.resetFields();
      });
    },
    getFieldsValue: <T>() => {
      return unref(formRef)?.getFieldsValue() as T;
    },
  };

  return [register, methods];
}
