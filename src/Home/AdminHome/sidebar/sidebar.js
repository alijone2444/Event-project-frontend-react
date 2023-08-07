import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  CalendarOutlined,
  UsergroupAddOutlined,
  ScheduleOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import './sidebar.css'

const { Sider } = Layout;
const { SubMenu } = Menu;

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Sider
    theme="light" // Use "dark" for a blue theme
    width={'16vw'}
    style={{
      overflow: 'auto',
      height: '100vh',
      position: 'fixed',
      left: 0,
    }}
    onCollapse={onCollapse}
    className={collapsed ? 'collapsed-sidebar' : ''}
    breakpoint="xs" // Set the breakpoint for sidebar collapse
    collapsedWidth={80} // Collapsed width to 0 to hide the sidebar
  >
    <Menu
      mode="inline"
      defaultSelectedKeys={['dashboard']}
      defaultOpenKeys={['sub1']}
      className='Sidebar-menu'
    >

        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="events" icon={<CalendarOutlined />}>
          Events
        </Menu.Item>
        <Menu.Item key="registration" icon={<UsergroupAddOutlined />}>
          Registration/Attendees
        </Menu.Item>
        <Menu.Item key="schedules" icon={<ScheduleOutlined />}>
          Schedules
        </Menu.Item>
        <SubMenu key="sub1" icon={<SettingOutlined />} title="Settings">
          <Menu.Item key="general">General</Menu.Item>
          <Menu.Item key="permissions">Permissions</Menu.Item>
        </SubMenu>
        <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
          Help and Support
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminSidebar;
