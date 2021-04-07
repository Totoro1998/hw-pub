import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Drawer,
  Dropdown,
  Form,
  Layout,
  Menu,
  Modal,
  Radio,
  Row,
  Select,
  Table,
  TimePicker,
  Timeline,
  Tooltip,
  Upload,
} from 'ant-design-vue';
import SvgIcon from '@/components/SvgIcon/index.vue'; // svg component
import { App } from 'vue';

const compList = [
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Drawer,
  Dropdown,
  Form,
  Layout,
  Layout.Content,
  Layout.Header,
  Layout.Sider,
  Menu,
  Menu.SubMenu,
  Menu.Item,
  Menu.ItemGroup,
  Modal,
  Radio,
  Row,
  Select,
  Table,
  TimePicker,
  Timeline,
  Tooltip,
  Upload,
  SvgIcon,
];

export function registerUI(app: App) {
  compList.forEach((comp: any) => {
    app.component(comp.name || comp.displayName, comp);
  });
}
