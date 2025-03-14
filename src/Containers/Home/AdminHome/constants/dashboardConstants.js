import { DollarCircleOutlined, ExclamationCircleOutlined, UserAddOutlined, PictureOutlined } from '@ant-design/icons';

const DashboardData = {
  title: "Welcome to Eventive Alpha",
  content: "Effortlessly manage events, attendees, and schedules in one place. Analyze event performance with insightful analytics. Elevate your event management game with Eventify. Let's create extraordinary and memorable events together."
};


const buttonConfig = [
  {
    key: 'report',
    background: '#4d5299',
    icon: <PictureOutlined style={{ fontSize: '5vw', color: 'white' }} />,
    title: 'Crousel Images',
    sub: 'Change',
    onClick: (props) => props.fourbuttonPressed('crousel-images-component'),
  },
  {
    key: 'users',
    background: '#f08c29',
    icon: <UserAddOutlined style={{ fontSize: '5vw', color: 'white' }} />,
    title: 'Users added',
    sub: 'Change',
    onClick: (props) => props.fourbuttonPressed('Active-users'),
  },
  {
    key: 'request',
    background: '#ff4d4d',
    icon: <ExclamationCircleOutlined style={{ fontSize: '5vw', color: 'white' }} />,
    title: 'Pending Requests',
    sub: 'View',
    onClick: (props) => props.fourbuttonPressed('request'),

  },
];

export { DashboardData, buttonConfig };

