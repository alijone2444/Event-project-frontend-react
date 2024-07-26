
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import StarBorderOutlined from '@mui/icons-material/StarBorderOutlined';
import societyicon from '../images/societyicon.png'
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
const constants = {

    menuitems: [
        { name: "Home", icon: <HomeOutlined /> },
        { name: "Events", icon: <StarBorderOutlined /> },
        { name: "Societies", icon: <img alt="Event Icon" src={societyicon} style={{ width: "24px", height: "24px" }} /> },
        { name: "Calander", icon: <CalendarTodayOutlined /> },
    ],
    settings: [
        { name: "Society Admin Portal", description: 'These are the some available options for a society leader to maintain his information of society', Icon: '' },
        { name: "Logout", description: 'A logout option allows users to securely end their current session and sign out of their account.', Icon: <LogoutIcon style={{ color: 'red' }} /> },

    ],
    // // /ist-ems-backend/
    // BASE_URL: 'http://192.168.1.18:3002/ist-ems-backend/',
    BASE_URL: 'https://ist-ems.live/ist-ems-backend/',

    BASE_URL_2: 'http://192.168.60.129:5000/',
    departmentOptions: [
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


}
export default constants;