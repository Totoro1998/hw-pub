export interface MenuItem {
  path: string;
  title: string;
  icon: string;
  showSide?: boolean;
  children?: MenuItem[];
}

declare type Nullable<T> = T | null;
declare type NonNullable<T> = T extends null | undefined ? never : T;
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
