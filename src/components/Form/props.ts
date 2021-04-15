import type { FormItem } from './types/form';
import type { PropType } from 'vue';

import { Recordable } from '@/types/config';

export const formBasicProps = {
  model: {
    type: Object as PropType<Recordable>,
    default: {},
  },
  // 标签宽度  固定宽度
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 0,
  },
  formItems: {
    type: [Array] as PropType<FormItem[]>,
    default: () => [],
  },
};
