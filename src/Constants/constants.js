
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import StarBorderOutlined from '@mui/icons-material/StarBorderOutlined';
import societyicon from '../images/societyicon.png'
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import Info from '@mui/icons-material/InfoOutlined';
import UserIcon from '@mui/icons-material/AccountCircleOutlined'
import { AimOutlined, TeamOutlined, AppstoreAddOutlined, RocketOutlined } from '@ant-design/icons';

const constants = {

    menuitems: [
        { name: "Home", icon: <HomeOutlined /> },
        { name: "Events", icon: <StarBorderOutlined /> },
        { name: "Societies", icon: <img alt="Event Icon" src={societyicon} style={{ width: "24px", height: "24px" }} /> },
        { name: "Calander", icon: <CalendarTodayOutlined /> },
    ], settings: [
        {
            name: "Calendar",
            description: "View and manage your events and schedules.",
            Icon: <CalendarTodayOutlined />
        },
        {
            name: "Profile",
            description: "View your profile and account details.",
            Icon: <UserIcon />
        },
        {
            name: "About Us",
            description: "Discover our mission and team.",
            Icon: <Info />
        },
        {
            name: "Society Admin Portal",
            description: "Manage society information and settings.",
            Icon: <AdminPanelSettingsIcon />
        },
        {
            name: "Logout",
            description: "Sign out of your account securely.",
            Icon: <LogoutIcon style={{ color: 'red' }} />
        }
    ],

    // // /ist-ems-backend/
    // BASE_URL: 'http://192.168.1.15:3002/ist-ems-backend/',
    BASE_URL: 'https://ist-ems.live/ist-ems-backend/',

    BASE_URL_2: 'http://192.168.1.15:5000/',
    departmentOptions: [
        "Computer Science",
        "Aeronautics and Astronautics",
        "Electrical Engineering",
        "Materials Science and Engineering",
        "Mechanical Engineering",
        "Avionics Engineering",
        "Space Science",
        "Applied Mathematics & Statistics",
        "Humanities & Sciences"
    ]
    ,
    societiesDescription: "At the Institute of Space and Technology University, our societies offer a vibrant and engaging community for students passionate about various fields. From cutting-edge space exploration to innovative technology and beyond, these societies provide a platform for students to collaborate, share ideas, and drive projects that push the boundaries of knowledge and creativity. Whether you're interested in astronomy, robotics, or engineering, our societies foster a collaborative environment where members can participate in events, workshops, and research activities, contributing to both personal growth and the advancement of scientific and technological frontiers."
    ,

    AboutPage: [
        {
            Title: 'Our Mission',
            color: '#083444',
            Description: 'Our event management system aims to help societies gain popularity and increase student awareness about events. It supports faculty in organizing and managing events effectively.',
            Icon: <AimOutlined style={{ fontSize: '24px', color: 'white' }} />
        },
        {
            Title: 'Our Team',
            color: '#b0a42c',
            Description: 'Meet the dedicated team behind our event management system. Our team works tirelessly to ensure societies are well-promoted, students are informed, and events are seamlessly organized.',
            Icon: <TeamOutlined style={{ fontSize: '24px', color: 'white' }} />
        },
        {
            Title: 'Our Services',
            color: '#40040c',
            Description: 'We offer a range of services through our event management system, including event planning, coordination, and venue selection. Our platform is designed to enhance the visibility of societies and streamline event management.',
            Icon: <AppstoreAddOutlined style={{ fontSize: '24px', color: 'white' }} />
        },
        {
            Title: 'Impact & Benefits',
            color: '#68b4fc',
            Description: 'Discover how our system benefits both societies and students. It boosts society visibility, increases event awareness, and helps faculty organize and manage events with ease.',
            Icon: <RocketOutlined style={{ fontSize: '24px', color: 'white' }} />
        }
    ],
    moreAboutUS: {
        conceptSpark: 'Nadeem Yousaf (Lecturer | Researcher | AI | CyberSecurity | Computer Vision)',
        whoWeAre: 'Students of IST',
        mission: {
            title: 'Empower IST Students',
            description: 'Simplify event discovery and save time.',
        },
        howWeHelp: 'Effortless Event Discovery & Increased Engagement',
        dedicatedSupport: 'Admin Team ensures platform updates.',
        commitment: 'A year in development, built for the IST community.',
        contact: {
            email: 'alijone2444@gmail.com',
            phone: '0334-5082594',
        }
    },
    recentEvents: `These are the latest events added to our platform, showcasing the most current and newly published happenings. Stay up-to-date with what's just been announced!`,
    upcomingEvents: `A curated list of events scheduled to take place soon. This list helps you plan ahead and ensures you don’t miss out on events that align with your interests.`,
    popularEvents: `These events have gained significant attention and are highly favored by our community. Discover what’s trending and join in on the most talked-about activities!`
}





export default constants;