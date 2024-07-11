
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
        // {
        //     name: 'Logout',
        //     description: '',
        //     Icon: <LogoutIcon style={{ paddingLeft: '3%' }} />
        // },

    ],
    // BASE_URL: 'http://192.168.1.15:3002/',
    // BASE_URL_2: 'http://192.168.1.15:5000/',

    // BASE_URL: 'http://192.168.1.9:3002/',
    BASE_URL: 'https://2f03-182-180-46-244.ngrok-free.app/',

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

}
export default constants;