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
import { menuItems } from '../../constants/adminMenuItems';
const { Sider } = Layout;
const { SubMenu } = Menu;

const AdminSidebar = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
    const handleMenuItemClick = (key) => {
      props.selectedOption(key)
      
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

  {menuItems.map((item) =>
        item.subMenu ? (
          <SubMenu key={item.key} icon={item.icon} title={item.name}>
            {item.subMenu.map((subItem) => (
              <Menu.Item key={subItem.key} onClick={() => handleMenuItemClick(subItem.key)}>
                {subItem.name}
              </Menu.Item>
            ))}
          </SubMenu>
        ) : (
          <Menu.Item key={item.key} icon={item.icon} onClick={() => handleMenuItemClick(item.key)}>
            {item.name}
          </Menu.Item>
        )
      )}
      </Menu>
    </Sider>
  );
};

export default AdminSidebar;
