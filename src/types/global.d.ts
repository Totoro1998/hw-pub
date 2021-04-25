import type { PropType as VuePropType } from 'vue';
declare global {
  export type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
  declare type PropType<T> = VuePropType<T>;
  declare type Nullable<T> = T | null;
  declare type NonNullable<T> = T extends null | undefined ? never : T;
  declare type Recordable<T = any> = Record<string, T>;
  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T;
  };
  export type EmitType = (event: any, ...args: any[]) => void;
  declare interface ChangeEvent extends Event {
    target: HTMLInputElement;
  }
  export type Recordable<T = any> = Record<string, T>;
  export interface Fn<T = any, R = T> {
    (...arg: T[]): R;
  }
  export interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
    $el: T;
  }
  export type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;
}
