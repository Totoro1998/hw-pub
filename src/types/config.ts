import { ComputedRef, Ref, unref } from 'vue';

export interface MenuItem {
  path: string;
  title: string;
  icon: string;
  showSide?: boolean;
  children?: MenuItem[];
}

export type Nullable<T> = T | null;
export type NonNullable<T> = T extends null | undefined ? never : T;
export type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
export type Recordable<T = any> = Record<string, T>;
export interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}
export type EmitType = (event: any, ...args: any[]) => void;

export type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>;
};
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key]);
  });

  return ret as Partial<U>;
}
export interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T;
}

export type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;
