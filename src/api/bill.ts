import { IBusiness, IPagnationOptions } from '@/store/types';
import request from '@/utils/request';

export function getProgressList(params: Partial<IBusiness> & IPagnationOptions) {
  return request.get<null, { items: IBusiness[]; total: number }>('/api/bill/list', { params });
  // let temp_data : IBusiness[] = []
  // temp_data = [
  //   {
  //     id: 0,
  //     name: 'totoro',
  //     cycle: '2020-11',
  //     create_at: '2020-8-12-12',
  //     am: 'momo',
  //     bd: 'momo',
  //     contract: '20898-力比科技魔都互娱有限公司',
  //     total: 12,
  //     gp: '12000.56',
  //     tiered_amount: '0.000',
  //     done_time: '2020-9-12-12'
  //   }
  // ]
  // return { items: temp_data, total: 1 }
}
