export type ComponentType =
  | 'a-input'
  | 'a-select'
  | 'a-time-picker'
  | 'a-date-picker'
  | 'a-range-picker';
export interface FormItem {
  // 字段名称
  field: string;
  changeEvent?: string;
  label?: string;
  componentType: ComponentType;
  componentProps?: {
    allowClear?: boolean;
    placeholder?: string;
    // 是否开启远程搜索
    filterOption?: boolean;
    // 下拉框的值
    options?: { value: string | number | boolean; label: string; key?: string }[];
    // 日期类型和下拉框是否多选
    mode?: 'time' | 'date' | 'month' | 'year' | 'decade' | 'multiple';
    // 日期值format
    valueFormat?: string;
    // 不可选择的日期
    disabledDate?: (currentDate: any) => boolean;
  };
}
export interface FormActionType {
  getFieldsValue: () => Recordable;
}
