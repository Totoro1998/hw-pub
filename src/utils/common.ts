import { unref } from 'vue';

export const isDev =
  window.location.origin.includes('dev-gamepub') ||
  window.location.origin.includes('localhost') ||
  window.location.origin.includes('127.0.0.1');

export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {};
  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key]);
  });
  return ret as Partial<U>;
}
