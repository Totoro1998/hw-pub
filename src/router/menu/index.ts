import workbench from './workbench';
import pub from './pub';
import product from './product';
import meta from './meta';

import map from 'lodash/map';
import { MenuItem } from '@/types/config';

export const menus: MenuItem[] = [workbench, pub, product, meta];
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
