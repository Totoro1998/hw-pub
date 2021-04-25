import type { PaginationProps } from '../types/pagination';
import type { BasicTableProps } from '../types/table';

import { computed, unref, ref, ComputedRef } from 'vue';
import isBoolean from 'lodash/isBoolean';
interface ItemRender {
  page: number;
  type: 'page' | 'prev' | 'next';
  originalElement: any;
}
// 用于自定义页码的结构，可用于优化 SEO
function itemRender({ page, type, originalElement }: ItemRender) {
  if (type === 'prev') {
    return page === 0 ? null : <svg-icon iconName="iconLeftOutlined" />;
  }
  if (type === 'next') {
    return page === 1 ? null : <svg-icon iconName="iconRightOutlined" />;
  }
  if (type === 'page') {
    return originalElement;
  }
}

export function usePagination(refProps: ComputedRef<BasicTableProps>) {
  const configRef = ref<PaginationProps>({});
  const show = ref(true);

  const getPaginationInfo = computed((): PaginationProps | boolean => {
    const { pagination } = unref(refProps);

    if (!unref(show) || (isBoolean(pagination) && !pagination)) {
      return false;
    }

    return {
      current: 1,
      rowsPerPage: 5,
      size: 'small',
      defaultPageSize: 5,
      showSizeChanger: true,
      pageSizeOptions: ['5', '10', '20', '50'],
      itemRender: itemRender,
      showQuickJumper: true,
      hideOnSinglePage: true,
      ...(isBoolean(pagination) ? {} : pagination),
      ...unref(configRef),
    };
  });

  function setPagination(info: Partial<PaginationProps>) {
    const paginationInfo = unref(getPaginationInfo);
    configRef.value = {
      ...(!isBoolean(paginationInfo) ? paginationInfo : {}),
      ...info,
    };
  }
  async function setShowPagination(flag: boolean) {
    show.value = flag;
  }

  return { getPaginationInfo, setShowPagination, setPagination };
}
