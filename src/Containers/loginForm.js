import React, { useState, useRef } from "react";
import ThreeScene from "../Components/THREE/threeObject";
import { useTheme, useMediaQuery } from "@mui/material";
import "../App.css";
import LoginForm from "../Components/LoginForm/login_form";
import TypewriterEffect from "../Components/Typewritter/typeWriter";
import backgroundMusic from '../audio/background_Music.mp3';
import {  Tag } from "antd"; // Import Ant Design components
import { VolumeUp, VolumeOff } from "@mui/icons-material/"; // Import Material-UI icons
import SignUp from "../Components/signup_form/signup_form";


function Login() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [flag, setFlag] = useState(true);
  const [login,setlogin] = useState(true)
  const audioRef = useRef(new Audio(backgroundMusic));
  
  
const start = () => {
    const audio = audioRef.current;

    if (flag) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0; // Rewind the audio to the beginning when paused
    }

    setFlag((prevFlag) => !prevFlag);
  };
  const handlestopingaudio=()=>{
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }
  return (
    <div>
      <div>
        <ThreeScene stopAudio={handlestopingaudio}/>
      </div>
      <div className="login-screen">
        {!isMobile && <TypewriterEffect />}
        {login ? <LoginForm issmall={isMobile} showSignup={()=>{setlogin(false)}}/>:<SignUp  issmall={isMobile} showSignIn={()=>{setlogin(true)}}/>}
        <div style={{ position: "absolute", bottom: 0, left: 0 ,display:'flex',flexDirection:'row'}}>
          <div onClick={start} style={{background: "transparent", color: "white",cursor:'pointer' }}>
            {flag ? <VolumeUp style={{paddingLeft:'10px',paddingRight:'10px'}}/> 
            : <VolumeOff style={{paddingLeft:'10px',paddingRight:'10px'}}/>}
          </div>
          <Tag color={flag ? "success" : "error"} style={{ background:'transparent' }}>
            {flag ? "Enable" : "Disable"} Sound Effect
          </Tag>
        </div>
      </div>
      </div>
  );
}

export default Login;
