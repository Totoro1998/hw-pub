import type { PropType } from 'vue';
import type { PaginationProps } from './types/pagination';
import type {
  BasicColumn,
  FetchSetting,
  SorterResult,
  TabConfig,
  TabItems,
  TableCustomRecord,
} from './types/table';
import { Recordable } from '@/types/config';
import { FormProps } from '@/components/Form/types/form';

const DEFAULT_FILTER_FN = (data: Partial<Recordable<string[]>>) => {
  return data;
};
const DEFAULT_SORT_FN = (sortInfo: SorterResult) => {
  const { field, order } = sortInfo;
  return {
    field,
    order,
  };
};
const FETCH_SETTING = {
  pageField: 'page',
  sizeField: 'rowsPerPage',
  listField: 'items',
  totalField: 'total',
  orderByField: 'order_by',
  orderField: 'order',
};
export const basicProps = {
  isUseTabs: {
    type: Boolean,
    default: false,
  },
  activeKey: {
    type: String,
  },
  tabItems: {
    type: Array as PropType<TabItems[]>,
  },
  tabConfig: {
    type: Object as PropType<TabConfig>,
    default: () => {
      return {};
    },
  },
  tableSetting: {
    type: Object,
    default: {},
  },
  inset: {
    type: Boolean,
  },
  sortFn: {
    type: Function as PropType<(sortInfo: SorterResult) => any>,
    default: DEFAULT_SORT_FN,
  },
  filterFn: {
    type: Function as PropType<(data: Partial<Recordable<string[]>>) => any>,
    default: DEFAULT_FILTER_FN,
  },
  showTableSetting: {
    type: Boolean,
  },
  autoCreateKey: {
    type: Boolean,
    default: true,
  },
  striped: {
    type: Boolean,
    default: true,
  },
  showSummary: {
    type: Boolean,
  },
  summaryFunc: {
    type: [Function, Array] as PropType<(...arg: any[]) => any[]>,
    default: null,
  },
  summaryData: {
    type: Array as PropType<Recordable[]>,
    default: null,
  },
  indentSize: {
    type: Number,
    default: 24,
  },
  canColDrag: {
    type: Boolean,
    default: true,
  },
  api: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null,
  },
  fetchSetting: {
    type: Object as PropType<FetchSetting>,
    default: () => {
      return FETCH_SETTING;
    },
  },
  // 立即请求接口
  immediate: {
    type: Boolean,
    default: true,
  },
  emptyDataIsShowTable: {
    type: Boolean,
    default: true,
  },
  // 额外的请求参数
  searchInfo: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  // 使用搜索表单
  useSearchForm: {
    type: Boolean,
  },
  // 表单配置
  formConfig: {
    type: Object as PropType<Partial<FormProps>>,
    default: null,
  },
  columns: {
    type: [Array] as PropType<BasicColumn[]>,
    default: () => [],
  },
  showIndexColumn: {
    type: Boolean,
    default: true,
  },
  indexColumnProps: {
    type: Object as PropType<BasicColumn>,
    default: null,
  },
  actionColumn: {
    type: Object as PropType<BasicColumn>,
    default: null,
  },
  ellipsis: {
    type: Boolean,
    default: true,
  },
  canResize: {
    type: Boolean,
    default: true,
  },
  clearSelectOnPageChange: {
    type: Boolean,
  },
  resizeHeightOffset: {
    type: Number,
    default: 0,
  },
  title: {
    type: [String, Function] as PropType<string | ((data: Recordable) => string)>,
    default: null,
  },
  dataSource: {
    type: Array as PropType<Recordable[]>,
    default: null,
  },
  rowKey: {
    type: [String, Function] as PropType<string | ((record: Recordable) => string)>,
    default: '',
  },
  bordered: {
    type: Boolean,
  },
  pagination: {
    type: [Object, Boolean] as PropType<PaginationProps | boolean>,
    default: null,
  },
  loading: {
    type: Boolean,
  },
  rowClassName: {
    type: Function as PropType<(record: TableCustomRecord<any>, index: number) => string>,
  },
  scroll: {
    type: Object as PropType<{ x: number | true; y: number }>,
    default: null,
  },
};
