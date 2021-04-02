import { IUserInfo } from '@/store/types';
import request from '@/utils/request';
/**
 * 获取用户信息
 */
export const getUserInfo = () => request.get<null, IUserInfo>('/cas/userinfo');

/**
 * 登出
 */
export const logout = () => request.get('/cas/cas_logout');
