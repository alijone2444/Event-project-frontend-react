import {
  DashboardOutlined,
  CalendarOutlined,
  UsergroupAddOutlined,
  ScheduleOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  UserAddOutlined,
  ReadOutlined,
  FacebookOutlined,
  PictureOutlined,
  Broadcast
} from '@ant-design/icons';

import { VolumeUp } from "@mui/icons-material/";
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
    key: 'Crousel-Images',
    icon: <PictureOutlined />,
    name: 'Crousel Images',
  }
  ,
  {
    key: 'societies', // Add a new key for the logout item
    icon: <img alt="Event Icon" src={societyicon} style={{ width: "18px", height: "18px" }} />,
    name: 'Societies', // Display 'Logout' as the name
  },
  {
    key: 'society-admin', // Add a new key for the logout item
    icon: <UserAddOutlined />,
    name: 'Create Society admin', // Display 'Logout' as the name
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
    key: 'post-to-facebook',
    icon: <FacebookOutlined />,
    name: 'Post to facebook',
  },
  
  {
    key: 'bot-knowledge',
    icon: <ReadOutlined />,
    name: 'Evento Knowledge',
  },
  {
    key: 'BroadCast',
    icon: <VolumeUp />,
    name: 'BroadCast Message',
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
