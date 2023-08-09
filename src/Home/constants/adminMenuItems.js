import {
    DashboardOutlined,
    CalendarOutlined,
    UsergroupAddOutlined,
    ScheduleOutlined,
    SettingOutlined,
    QuestionCircleOutlined,
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
        { key: 'theme', name: 'Theme' },
        { key: 'history', name: 'History' },
        { key: 'Messages', name: 'Messages' },
        //bug reports or messages
      ],
    },
    {
      key: 'help',
      icon: <QuestionCircleOutlined />,
      name: 'Help and Support',
    },
  ];