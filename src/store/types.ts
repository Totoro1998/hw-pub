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
