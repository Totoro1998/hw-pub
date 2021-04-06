import dashboardMenu from './dashboard';
import workMenu from './work';
import workBench from './workbench';
import map from 'lodash/map';
import { MenuItem } from '@/types/config';

export const menus: MenuItem[] = [workBench, dashboardMenu, workMenu];
export const formatMenuPath = (data: MenuItem[], parentPath = '/') =>
  map(data, (item) => {
    const result = {
      ...item,
      path: `${parentPath}${item.path}`,
    };
    if (item.children) {
      result.children = formatMenuPath(item.children, `${parentPath}${item.path}/`);
    }
    return result;
  });

export const getFlatMenus = () => {
  const tempMenus: MenuItem[] = [];
  const FlatMenus = (menus: MenuItem[], parentPath = '/') => {
    menus.forEach((item) => {
      tempMenus.push({
        ...item,
        path: `${parentPath}${item.path}`,
      });
      if (item.children) {
        FlatMenus(item.children, `${parentPath}${item.path}/`);
      }
    });
  };
  FlatMenus(menus);
  return tempMenus;
};
