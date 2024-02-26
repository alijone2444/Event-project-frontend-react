import {
  DashboardOutlined,
  CalendarOutlined,
  UsergroupAddOutlined,
  ScheduleOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  LogoutOutlined, // Import the LogoutOutlined icon
} from '@ant-design/icons';

export const menuItems = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    name: 'Dashboard',
  },
  {
    key: 'events',
    icon: <CalendarOutlined />,
    name: 'Events',
  },
  {
    key: 'registration',
    icon: <UsergroupAddOutlined />,
    name: 'Registration/Attendees',
  },
  {
    key: 'schedules',
    icon: <ScheduleOutlined />,
    name: 'Schedules',
  },
  {
    key: 'sub1',
    icon: <SettingOutlined />,
    name: 'Settings',
    subMenu: [
      { key: 'general', name: 'General' },
      { key: 'history', name: 'History' },
      { key: 'Messages', name: 'Messages' },
    ],
  },
  {
    key: 'help',
    icon: <QuestionCircleOutlined />,
    name: 'Help and Support',
  },
  {
    key: 'logout', // Add a new key for the logout item
    icon: <LogoutOutlined style={{color:'red'}}/>, // Use the LogoutOutlined icon
    name: 'Logout', // Display 'Logout' as the name
  },
];
