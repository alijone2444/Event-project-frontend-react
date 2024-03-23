import {
  DashboardOutlined,
  CalendarOutlined,
  UsergroupAddOutlined,
  ScheduleOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import societyicon from '../../../images/societyicon.png'

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
    key: 'societies', // Add a new key for the logout item
    icon: <img alt="Event Icon" src={societyicon} style={{ width: "18px", height: "18px" }} />,
    name: 'Societies', // Display 'Logout' as the name
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
    icon: <LogoutOutlined style={{ color: 'red' }} />, // Use the LogoutOutlined icon
    name: 'Logout', // Display 'Logout' as the name
  },
];
