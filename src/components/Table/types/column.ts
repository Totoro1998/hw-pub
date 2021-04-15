import { VNodeChild } from 'vue';
export declare type SortOrder = 'ascend' | 'descend';

export interface RecordProps<T> {
  text: any;
  record: T;
  index: number;
}
export declare type CustomRenderFunction<T> = (record: RecordProps<T>) => VNodeChild | JSX.Element;

export interface ColumnProps<T> {
  align?: 'left' | 'right' | 'center';
  ellipsis?: boolean;
  colSpan?: number;
  dataIndex?: string;
  filtered?: boolean;
  fixed?: boolean | 'left' | 'right';
  key?: string;
  customRender?: CustomRenderFunction<T> | VNodeChild | JSX.Element;
  sorter?: boolean | Function;
  sortOrder?: boolean | SortOrder;
  sortDirections?: SortOrder[];
  title?: VNodeChild | JSX.Element;
  width?: string | number;
}
