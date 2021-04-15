import type { VNodeChild } from 'vue';
import type { PaginationProps } from './pagination';
import { FormProps } from '@/components/Form/types/form';

import type {
  ColumnProps,
  TableRowSelection as ITableRowSelection,
} from 'ant-design-vue/lib/table/interface';

import { EmitType, Recordable } from '@/types/config';
export type VueNode = VNodeChild | JSX.Element;
export declare type SortOrder = 'ascend' | 'descend';
export interface TableRowSelection<T = any> extends ITableRowSelection {
  /**
   * Callback executed when selected rows change
   * @type Function
   */
  onChange?: (selectedRowKeys: string[] | number[], selectedRows: T[]) => any;

  /**
   * Callback executed when select/deselect one row
   * @type FunctionT
   */
  onSelect?: (record: T, selected: boolean, selectedRows: Object[], nativeEvent: Event) => any;

  /**
   * Callback executed when select/deselect all rows
   * @type Function
   */
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => any;

  /**
   * Callback executed when row selection is inverted
   * @type Function
   */
  onSelectInvert?: (selectedRows: string[] | number[]) => any;
}

// 用于定义行类名
export interface TableCustomRecord<T = Recordable> {
  record?: T;
  index?: number;
}

export interface SorterResult {
  column: ColumnProps;
  order: SortOrder;
  field: string;
  columnKey: string;
}

export interface FetchParams {
  searchInfo?: Recordable;
  page?: number;
  sortInfo?: Recordable;
  filterInfo?: Recordable;
}

export interface GetColumnsParams {
  ignoreIndex?: boolean;
  ignoreAction?: boolean;
  sort?: boolean;
}

export type SizeType = 'default' | 'middle' | 'small' | 'large';

export interface TableActionType {
  reload: (opt?: FetchParams) => Promise<void>;
  setPagination: (info: Partial<PaginationProps>) => void;
  setTableData: <T = Recordable>(values: T[]) => void;
  getColumns: (opt?: GetColumnsParams) => BasicColumn[];
  setColumns: (columns: BasicColumn[] | string[]) => void;
  getDataSource: <T = Recordable>() => T[];
  setLoading: (loading: boolean) => void;
  setProps: (props: Partial<BasicTableProps>) => void;
  getPaginationRef: () => PaginationProps | boolean;
  emit?: EmitType;
  updateTableData: (index: number, key: string, value: any) => Recordable;
  setShowPagination: (show: boolean) => Promise<void>;
  getShowPagination: () => boolean;
}

export interface FetchSetting {
  // 请求接口当前页数
  pageField: string;
  // 每页显示多少条
  sizeField: string;
  // 请求结果列表字段
  listField: string;
  // 请求结果总数字段
  totalField: string;
  orderField: string;
  orderByField: string;
}

export interface TableSetting {
  setting?: boolean;
  fullScreen?: boolean;
}
export interface TabItems {
  key: string | number;
  tab: string | number;
}
export interface TabConfig {
  isUseTabs: boolean;
  activeKey: string;
  tabItems: TabItems[];
  searchField?: string;
}

export interface BasicTableProps<T = any> {
  //是否开启tabs
  tabConfig?: TabConfig;
  // 自定义排序方法
  sortFn?: (sortInfo: SorterResult) => any;
  // 过滤方法
  filterFn?: (data: Partial<Recordable<string[]>>) => any;
  // 取消表格的默认padding
  inset?: boolean;
  // 显示表格设置
  showTableSetting?: boolean;
  tableSetting?: TableSetting;
  // 斑马纹
  striped?: boolean;
  // 是否自动生成key
  autoCreateKey?: boolean;
  // 接口请求对象
  api?: (...arg: any) => Promise<any>;
  // 请求接口配置
  fetchSetting?: FetchSetting;
  // 立即请求接口
  immediate?: boolean;
  // 在开起搜索表单的时候，如果没有数据是否显示表格
  emptyDataIsShowTable?: boolean;
  // 额外的请求参数
  searchInfo?: Recordable;
  // 使用搜索表单
  useSearchForm?: boolean;
  columns: BasicColumn[];
  // 是否显示序号列
  showIndexColumn?: boolean;
  // 序号列配置
  indexColumnProps?: BasicColumn;
  // 操作列配置
  actionColumn?: BasicColumn;
  // 文本超过宽度是否显示。。。
  ellipsis?: boolean;
  // 是否可以自适应高度
  canResize?: boolean;
  // 自适应高度偏移， 计算结果-偏移量
  resizeHeightOffset?: number;
  // 在分页改变的时候清空选项
  clearSelectOnPageChange?: boolean;
  //
  rowKey?: string | ((record: Recordable) => string);
  // 数据
  dataSource?: Recordable[];
  // 表单配置
  formConfig?: Partial<FormProps>;
  // 是否显示边框
  bordered?: boolean;
  // 分页配置
  pagination?: PaginationProps | boolean;
  // loading加载
  loading?: boolean;
  indentSize?: number;
  rowClassName?: (record: TableCustomRecord<T>) => string;
  scroll?: { x?: number | true; y?: number };
  showHeader?: boolean;
  size?: SizeType;
  title?: VNodeChild | JSX.Element | string | ((data: Recordable) => string);
  tableLayout?: 'auto' | 'fixed' | string;
  transformCellText?: Function;
  onChange?: (pagination: any, filters: any, sorter: any, extra: any) => void;
}

export type CellFormat =
  | string
  | ((text: string, record: Recordable, index: number) => string | number)
  | Map<string | number, any>;

// @ts-ignore
export interface BasicColumn extends ColumnProps {
  flag?: 'INDEX' | 'DEFAULT' | 'CHECKBOX' | 'RADIO' | 'ACTION';
  customTitle?: VueNode;
  slots?: Recordable;
  defaultHidden?: boolean;
  format?: CellFormat;
  edit?: boolean;
}
