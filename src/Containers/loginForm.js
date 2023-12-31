import LoginCarousel from "../Components/LoginCrousel/loginCrousel"
import LoginForm from "../Components/LoginForm/loginForm"
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import Image from '../images/login_background.jpg'

function Login() {
    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const images = [
      {
        src: "test1.jpg",
        legend: "Login and enjoy",
      },
      {
        src: "test2.jpg",
        legend: "Explore  Events, Attendance, Finance, and More",
      },
      {
        src: "test3.jpg",
        legend: "Welcome to our Secure Dashboard App",
      },
    ];
    // filter: 'invert(90%)'
  return (
    <div style={{position:"absolute",top:'50%',transform:'translateY(-50%)',height:"100vh",backgroundImage: `url(${Image})` ,backgroundSize:'cover',
     width:"100%"  ,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{  width: "90%", display: "flex" ,alignItems:"center",justifyContent:"center"}}>
        {!isSmallScreen && <div style={{ width: "60%" }}>
            <LoginCarousel images={images}/>
        </div>}
        <div style={{ display:"flex",flex: 1,alignItems:"center",  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <LoginForm />
        </div>
        </div>
    </div>
  );
}

export default Login;
