import { RouteRecordRaw, RouteRecordRedirectOption, RawRouteComponent } from 'vue-router';

export interface AppRouteRecordRaw extends RouteRecordRaw {
  hidden?: boolean;
  showHeader?: boolean;
  path: string;
  name: string;
  meta?: Object;
  redirect?: RouteRecordRedirectOption;
  component: RawRouteComponent;
  children?: AppRouteRecordRaw[];
}

export interface MenuItem {
  path: string;
  title: string;
  icon: string;
  children?: MenuItem[];
}
