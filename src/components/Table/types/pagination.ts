import Pagination from 'ant-design-vue/lib/pagination';
import { VNodeChild } from 'vue';

interface PaginationRenderProps {
  page: number;
  type: 'page' | 'prev' | 'next';
  originalElement: any;
}

export declare class PaginationConfig extends Pagination {
  position?: 'top' | 'bottom' | 'both';
}
// 参考ant-design-vue Pagination  API
export interface PaginationProps {
  total?: number;
  defaultCurrent?: number;
  current?: number;
  defaultPageSize?: number;
  rowsPerPage?: number;
  hideOnSinglePage?: boolean;
  showSizeChanger?: boolean;
  pageSizeOptions?: string[];
  showQuickJumper?: boolean | object;
  showTotal?: (total: number, range: [number, number]) => any;
  size?: string;
  simple?: boolean;
  itemRender?: (props: PaginationRenderProps) => VNodeChild | JSX.Element;
}
