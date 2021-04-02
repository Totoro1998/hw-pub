import userStore from '@/store/modules/user';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import MD5 from 'crypto-js/md5';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 15000,
  withCredentials: true,
});
/**
 * @description: 请求之前的拦截器
 */
const requestInterceptor = (config: AxiosRequestConfig) => {
  const token = 'a817d18a-28e2-11eb-a9a7-b8098a44779f';
  const timestamp = new Date().getTime().toString().substring(0, 10);
  const ori_str = timestamp + token;
  const signature = MD5(ori_str);
  config.headers['timestamp'] = timestamp;
  config.headers['signature'] = signature;
  config.headers['appname'] = 'pub';
  config.headers['username'] = encodeURIComponent(userStore.name);
  return config;
};
/**
 * @description: 请求之前的拦截器错误处理
 */
const requestInterceptorCatch = (error: Error) => {
  Promise.reject(error);
};
/**
 * @description: 请求之后的拦截器
 */
const responseInterceptor = (response: AxiosResponse<any>) => {
  if (response.data.success || response.data.code === 0) {
    return Promise.resolve<any>(response.data.data);
  }
  const errMsg = response.data.msg || response.data.message;
  return Promise.reject<any>(new Error(errMsg));
};
/**
 * @description: 请求之后的拦截器错误处理
 */
const responseInterceptorCatch = (error: any) => {
  if (error.response && error.response.status === 401) {
    const login_url = `${window.location.origin.replace('localhost', '127.0.0.1')}/login`;
    window.location.href = login_url;
  } else {
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000,
    // });
  }
  return Promise.reject(error);
};

service.interceptors.request.use(requestInterceptor, requestInterceptorCatch);
service.interceptors.response.use(responseInterceptor, responseInterceptorCatch);
export default service;
