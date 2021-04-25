import { ref, ComputedRef, unref, watch } from 'vue';
import type { BasicTableProps } from '../types/table';

export function useTabs(props: ComputedRef<BasicTableProps>, emit: EmitType) {
  const tabConfigRef = ref(unref(props).tabConfig);

  watch(
    () => unref(props).tabConfig?.activeKey,
    (activeKey) => {
      if (tabConfigRef.value?.activeKey) {
        emit('tab-change', activeKey);
      }
      tabConfigRef.value = unref(props).tabConfig;
    }
  );
  return { tabConfigRef };
}
