export interface MenuItem {
  path: string;
  title: string;
  icon: string;
  showSide?: boolean;
  children?: MenuItem[];
}
