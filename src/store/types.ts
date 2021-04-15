export interface IUserInfo {
  id: string;
  department: string;
  email: string;
  avatar: string;
  name: string;
  token: string;
  webeye: number;
  roles: string[];
  employee_id: string;
  hw_role_list: string[];
  [prop: string]: any;
  hw_role_name_list: string[];
  team_list: { team_id: number }[];
}
export interface IBusiness {
  id: number;
  am_name: string;
  hw_bill_url: string;
  corp_id: number;
  owner_name: string;
  confirmation_id: number; // 结算单状态
  contract_id: number; // 合同id
  contract_name: string; // 合同名称
  corp_name: string; // 开发者名称
  hw_contract_url: string;
  name: string;
  by_manual?: number;
  month: string; // 结算周期
  cycle: string;
  contract: string;
  created_at: string;
  product_count: number;
  am: string;
  bd?: string;
  total: number;
  gp: number;
  tiered_amount: string;
  done_time: string;
  cost: number;
  revenue: number;
  share_amount: number;
  hw_status: string; // HW结算状态
}
export interface IWorkFlow {
  id: string;
  source_state_id: number;
  level: number;
  back_name: string;
  name: string;
  order: number;
  circulation_mark: string;
  modifier: string;
  gmt_modified: string;
  module: string;
  state_ids: [];
  end_operator_names: string[];
  change_operator_names: string[];
  transition_id: string;
  end_operator: string[];
  change_operator: string[];
  source_state_name: string;
}
export interface IPagnationOptions {
  page: number;
  rowsPerPage: number;
}
