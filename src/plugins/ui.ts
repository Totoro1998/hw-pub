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
  Input,
  Radio,
  Row,
  Select,
  Table,
  Tabs,
  TimePicker,
  Timeline,
  Tooltip,
  Upload,
  DatePicker,
} from 'ant-design-vue';
import SvgIcon from '@/components/SvgIcon/index.vue'; // svg component
import TableAction from '@/components/Table/components/TableAction.vue'; // svg component
import { WeForm } from '@/components/Form';

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
  Form.Item,
  Layout,
  Layout.Content,
  Layout.Header,
  Layout.Sider,
  Menu,
  Menu.SubMenu,
  Menu.Item,
  Menu.ItemGroup,
  Modal,
  Input,
  Radio,
  Row,
  Select,
  Select.Option,
  Table,
  Tabs,
  Tabs.TabPane,
  TimePicker,
  Timeline,
  Tooltip,
  Upload,
  SvgIcon,
  TableAction,
  DatePicker,
  DatePicker.MonthPicker,
  DatePicker.RangePicker,
  WeForm,
];
export function registerUI(app: App) {
  compList.forEach((comp: any) => {
    app.component(comp.name || comp.displayName, comp);
  });
}
