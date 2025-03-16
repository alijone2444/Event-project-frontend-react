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
import QuickSignup from "../Components/signup_form/quickSignup";
import { handleCardOcr } from "../services/ocr";

function Login(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isQuickSignup, setisQuickSignup] = useState(true);
  const [flag, setFlag] = useState(true);
  const [login, setLogin] = useState(true);
  const audioRef = useRef(new Audio(backgroundMusic));
  const [forget, setForget] = useState(false);
  const [showQuickSignUp, setShowQuickSignUp] = useState(false);
  const navigate = useNavigate();
  const [ocrResults, setOcrResults] = useState([]);
  const [loadingOcr, setloadingOcr] = useState(false);
  const [showcamera, setshowcamera] = useState(true);
  const [croppedImages, setCroppedImages] = useState([]); // Store the cropped images

  const location = useLocation();

  useEffect(() => {
    // Cleanup function to pause and reset audio when component unmounts
    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);

  const processImages = async (images) => {
    await handleCardOcr(images, setloadingOcr, setCroppedImages, setOcrResults);
    setShowQuickSignUp(true); // Show QuickSignup after processing images
    setLogin(false); // Hide LoginForm
    setForget(false); // Hide ForgotPassword
  };
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
    setLogin(false); // Hide LoginForm
    setShowQuickSignUp(false); // Hide QuickSignup
  };

  const handlestopingaudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const showSignUp = () => {
    setShowQuickSignUp(false); // Hide QuickSignup
    setLogin(false); // Hide LoginForm
    setForget(false); // Hide ForgotPassword
  };

  const showLogin = () => {
    setShowQuickSignUp(false); // Hide QuickSignup
    setLogin(true); // Show LoginForm
    setForget(false); // Hide ForgotPassword
  };

  return (
    <div>
      <div>
        <ThreeScene stopAudio={handlestopingaudio} />
      </div>
      <div className="login-screen">
        {!isMobile && <TypewriterEffect />}
        {forget && !showQuickSignUp ? (
          <ForgotPassword showLoginComeback={() => { setForget(false); setLogin(true); }} />
        ) : login && !showQuickSignUp ? (
          <LoginForm
            forgetPassCallback={handleForgotPassword}
            showAdmin={() => { navigate(location.pathname + '/success') }}
            issmall={isMobile}
            type={props.type}
            showSignup={(isQuickSignup) => { setLogin(false); setisQuickSignup(isQuickSignup) }}
          />
        ) : !showQuickSignUp ? (
          <SignUp
            issmall={isMobile}
            isQuickSignup={isQuickSignup}
            showSignIn={() => { setLogin(true) }}
            processImages={(images) => { processImages(images) }}
          />
        ) : null}
        {showQuickSignUp && (
          <QuickSignup
            showSignUp={showSignUp} // Pass the showSignUp callback
            showLogin={showLogin} // Pass the showLogin callback
            inputString={ocrResults}
            onRetry={() => setshowcamera(false)}
            onConfirm={() => { console.log('greater') }}
          />
        )}

        {/*<div style={{ position: "absolute", bottom: 0, left: 0, display: 'flex', flexDirection: 'row', zIndex: 2 }}>
          <div
            onClick={start}
            style={{ background: "transparent", color: "white", cursor: 'pointer', zIndex: 2 }}
          >
            {flag ? <VolumeUp style={{ paddingLeft: '10px', paddingRight: '10px' }} /> : <VolumeOff style={{ paddingLeft: '10px', paddingRight: '10px' }} />}
          </div>
          <Tag color={flag ? "success" : "error"} style={{ background: 'transparent' }}>
            {flag ? "Enable" : "Disable"} Sound Effect
          </Tag>
        </div>*/}
      </div>
    </div>
  );
}

export default Login;