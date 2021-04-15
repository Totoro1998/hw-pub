import { IPagnationOptions, IWorkFlow } from '@/store/types';
import request from '@/utils/request';

/**
 * 获取工作流列表
 * @param params
 */
export function getWorkFlowList(params: { name: string } & IPagnationOptions) {
  return request.get<null, { items: IWorkFlow[]; total: number }>('/loonflow/v1.0/workflows', {
    params,
  });
}
