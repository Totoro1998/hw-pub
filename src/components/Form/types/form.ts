import { Recordable } from '@/types/config';

type ColSpanType = number | string;
export type ComponentType = 'a-input' | 'a-select';
export interface FormItem {
  // 字段名称
  field: string;
  // Event name triggered by internal value change, default change
  changeEvent?: string;
  // Label值
  label: string;
  valueField?: string;
  // Label宽度
  labelWidth?: string | number;
  // 是否需要折叠
  isAdvanced?: boolean;
  component: ComponentType;
  componentProps?: {
    allowClear?: boolean;
    placeholder?: string;
    filterOption?: boolean;
    options: { value: string | number | boolean; label: string; key?: string }[];
  };
}
interface ColEx {
  style?: any;
  /**
   * raster number of cells to occupy, 0 corresponds to display: none
   * @default none (0)
   * @type ColSpanType
   */
  span?: ColSpanType;

  /**
   * raster order, used in flex layout mode
   * @default 0
   * @type ColSpanType
   */
  order?: ColSpanType;

  /**
   * the layout fill of flex
   * @default none
   * @type ColSpanType
   */
  flex?: ColSpanType;

  /**
   * the number of cells to offset Col from the left
   * @default 0
   * @type ColSpanType
   */
  offset?: ColSpanType;

  /**
   * the number of cells that raster is moved to the right
   * @default 0
   * @type ColSpanType
   */
  push?: ColSpanType;

  /**
   * the number of cells that raster is moved to the left
   * @default 0
   * @type ColSpanType
   */
  pull?: ColSpanType;

  /**
   * <576px and also default setting, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  xs?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥576px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  sm?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥768px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  md?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥992px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  lg?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥1200px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  xl?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥1600px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  xxl?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;
}
export interface FormProps {
  model?: Recordable;
  labelWidth?: number | string;
  labelCol?: Partial<ColEx>;
  wrapperCol?: Partial<ColEx>;
  formItems?: FormItem[];
  size?: 'default' | 'small' | 'large';
  resetFunc?: () => Promise<void>;
  colon?: boolean;
}

export interface FormActionType {
  resetFields: () => Promise<void>;
  getFieldsValue: () => Recordable;
  setProps: (formProps: Partial<FormProps>) => Promise<void>;
}
