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
    return page === 0 ? null : 'pre';
  } else if (type === 'next') {
    return page === 1 ? null : 'next';
  }
  return originalElement;
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
      rowsPerPage: 10,
      size: 'small',
      defaultPageSize: 10,
      showTotal: (total) => `共${total}条`,
      showSizeChanger: true,
      pageSizeOptions: ['10', '50', '80', '100'],
      itemRender: itemRender,
      showQuickJumper: true,
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

  function getPagination() {
    return unref(getPaginationInfo);
  }

  function getShowPagination() {
    return unref(show);
  }

  async function setShowPagination(flag: boolean) {
    show.value = flag;
  }

  return { getPagination, getPaginationInfo, setShowPagination, getShowPagination, setPagination };
}
