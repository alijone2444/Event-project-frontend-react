
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import StarBorderOutlined from '@mui/icons-material/StarBorderOutlined';
import societyicon from '../images/societyicon.png'
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';
const constants = {

menuitems:[
    {name:"Home",icon:<HomeOutlined/>},
    {name:"Events",icon:<StarBorderOutlined/>},
    {name:"Societies",icon:<img  alt="Event Icon" src={societyicon} style={{width:"24px",height:"24px"}} />},
    {name:"Calander",icon:<CalendarTodayOutlined/>},
]
}
export default constants;