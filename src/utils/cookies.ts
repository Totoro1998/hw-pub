import Cookies from 'js-cookie';

// common
export const getCookie: (key: string) => string | undefined = (key) => Cookies.get(key);
export const setCookie: (key: string, payload: any) => void = (key, payload) => {
  if (typeof payload !== 'string') {
    payload = JSON.stringify(payload);
  }
  Cookies.set(key, payload);
};
export const removeCookie: (key: string) => void = (key) => Cookies.remove(key);
