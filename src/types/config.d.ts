import { ComputedRef, Ref } from 'vue';
declare type MenuItem = {
  path: string;
  title: string;
  icon: string;
  showSide?: boolean;
  children?: MenuItem[];
};
declare type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>;
};
