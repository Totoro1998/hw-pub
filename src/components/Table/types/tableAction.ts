import { ButtonProps } from 'ant-design-vue/es/button/buttonTypes';
export interface ActionItem extends ButtonProps {
  onClick?: Fn;
  label: string;
  color?: 'success' | 'error' | 'warning';
  disabled?: boolean;
}
