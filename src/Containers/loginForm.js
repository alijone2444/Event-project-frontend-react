import React, { useState, useRef, useEffect } from "react";
import ThreeScene from "../Components/THREE/threeObject";
import { useTheme, useMediaQuery } from "@mui/material";
import "../App.css";
import LoginForm from "../Components/LoginForm/login_form";
import TypewriterEffect from "../Components/Typewritter/typeWriter";
import backgroundMusic from '../audio/background_Music.mp3';
import { Tag } from "antd";
import { VolumeUp, VolumeOff } from "@mui/icons-material/";
import SignUp from "../Components/signup_form/signup_form";
import { useNavigate, useLocation } from "react-router-dom";
import ForgotPassword from "../Components/ForgetPasswordForm/ForgetPasswordForm";
function Login(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [flag, setFlag] = useState(true);
  const [login, setLogin] = useState(true);
  const audioRef = useRef(new Audio(backgroundMusic));
  const [forget, setForget] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Cleanup function to pause and reset audio when component unmounts
    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);

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
  const handleForgotPassword = () => {
    setForget(true);
    setLogin(false); // Optionally hide the login form when showing forgot password
  };
  const handlestopingaudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <div>
      <div>
        <ThreeScene stopAudio={handlestopingaudio} />
      </div>
      <div className="login-screen">
        {!isMobile && <TypewriterEffect />}
        {forget ? (
          <ForgotPassword showLoginComeback={() => { setForget(false); setLogin(true); }} />
        ) : (
          login ? (
            <LoginForm
              forgetPassCallback={handleForgotPassword}
              showAdmin={() => { navigate(location.pathname + '/success') }}
              issmall={isMobile}
              type={props.type}
              showSignup={() => { setLogin(false) }}
            />
          ) : (
            <SignUp
              issmall={isMobile}
              showSignIn={() => { setLogin(true) }}
            />
          )
        )}
        <div style={{ position: "absolute", bottom: 0, left: 0, display: 'flex', flexDirection: 'row', zIndex: 2 }}>
          <div
            onClick={start}
            style={{ background: "transparent", color: "white", cursor: 'pointer', zIndex: 2 }}
          >
            {flag ? <VolumeUp style={{ paddingLeft: '10px', paddingRight: '10px' }} /> : <VolumeOff style={{ paddingLeft: '10px', paddingRight: '10px' }} />}
          </div>
          <Tag color={flag ? "success" : "error"} style={{ background: 'transparent' }}>
            {flag ? "Enable" : "Disable"} Sound Effect
          </Tag>
        </div>
      </div>
    </div>
  );
}

export default Login;
