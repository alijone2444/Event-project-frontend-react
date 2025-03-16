import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup_form.css';
import TermsAndConditions from './termsAndConditions';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import constants from '../../Constants/constants';
import { makeStyles, styled } from '@mui/styles';
import { CircularProgress } from '@mui/material';
// import CameraComponent from '../camera/cameraAuthentication';
import CameraComponentVersionOne from '../camera/cameraAuthenticationV1';

const { Option } = Select;

const SignUp = (props) => {
  const [Email, setEmail] = useState('');
  const [Rollno, setRollno] = useState('');
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({ hasError: false, errorMessage: '' });
  const navigate = useNavigate();
  const [showBorder, setshowBorder] = useState(false);
  const [showTerms, setshowTerms] = useState(false);
  const [checked, setisChecked] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [loading, setloading] = useState(false);

  const [showcamera, setshowcamera] = useState(true)
  const onFinish = (values) => {
  };
  // const getImageDimensions = (base64) => {
  //   return new Promise((resolve, reject) => {
  //     const img = new Image();
  //     img.src = base64;
  //     img.onload = () => {
  //       resolve({ width: img.width, height: img.height });
  //     };
  //     img.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };

  const handleSubmit = async () => {
    setloading(true)
    try {
      if (
        checked &&
        Rollno &&
        Email &&
        password &&
        confirmpassword &&
        password === confirmpassword &&
        password.length >= 8 &&
        selectedDepartment
      ) {
        // Check if Rollno is a valid integer
        const rollnoInteger = parseInt(Rollno, 10); // 10 is the radix for base 10
        if (isNaN(rollnoInteger) || rollnoInteger.toString() !== Rollno.trim()) {
          // Rollno is not a valid integer or contains additional characters
          setError({ hasError: true, errorMessage: 'Invalid Roll number. Please enter a valid integer.' });
          return;
        }

        // Assuming you have a backend endpoint for user registration
        const response = await axios.post(`${constants.BASE_URL}signup`, {
          Email: Email,
          Rollno: rollnoInteger, // Use the parsed integer value
          password: password,
          department: selectedDepartment,
        });


        if (response.data.success === true) {
          navigate('/request'); // Redirect to the login page after successful registration
        } else {
          if (response.data.success === false) {
            setError({ hasError: true, errorMessage: 'User already exists' });
            setloading(false)
          }
        }
      } else {
        setloading(false)
        if (password !== confirmpassword) {
          setError({ hasError: true, errorMessage: "Passwords don't match" });
        } else if (!checked) {
          setError({ hasError: true, errorMessage: 'Read/accept terms' });
        } else if (!selectedDepartment) {
          setError({ hasError: true, errorMessage: 'Please select a department' });
        } else {
          setError({ hasError: true, errorMessage: 'Password is too small' });
        }
      }
    } catch (err) {
      setloading(false)
      // Handle the error
      console.error('Error:', err);
    }
  };

  const handleShowlogin = () => {
    setshowBorder(true);
    setTimeout(() => {
      props.showSignIn();
    }, 1000);
  };

  return (
    <div className="signup-container">
      {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {croppedImages.map((image, index) => (
          <div key={index} style={{ margin: '10px' }}>
            <img src={image} alt={`Cropped ${index}`} width={150} height={150} />
            <div>{ocrResults[index]}</div>
          </div>
        ))}
      </div> */}
      <div className="signup-form-container">
        {(props.isQuickSignup && showcamera) && <CameraComponentVersionOne onclose={() => setshowcamera(false)} onfinish={(images) => { setshowcamera(false); props.processImages(images) }} />}
        {showBorder && <><span className="top"></span></>}
        {showTerms ? (
          <TermsAndConditions gobackToSignup={() => setshowTerms(false)} />
        ) : (
          <>
            <h2 className="signup-title">Sign Up</h2>
            {/* {loadingOcr ?
              <CircularProgress size={20} style={{ color: 'white' }} />
              :
              <>
                {ocrResults.map((item, index) => (
                  <h6 key={index} style={{ color: 'white' }}>
                    {item.text}
                  </h6>
                ))}
              </>} */}
            <Form name="signupForm" initialValues={{ remember: true }} onFinish={onFinish}>

              <Form.Item name="Email Address" rules={[{ required: true, message: 'Enter your email to link your account to it!' }]}>
                <Input
                  style={{ backgroundColor: 'transparent', color: 'white' }}
                  className={classes.border}
                  placeholder="Email address"
                  type="email"

                  required
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </Form.Item>

              <Form.Item name="department" rules={[{ required: true, message: 'Please select your department!' }]}>
                <selectWrapper>
                  <Select
                    className='selectfield'
                    placeholder="Select Department"
                    style={{ backgroundColor: 'transparent', color: 'white' }}
                    onChange={(value) => setSelectedDepartment(value)}
                    disabled={props.isQuickSignup}
                  >
                    {constants.departmentOptions.map((department, index) => (
                      <Option key={index} value={department} style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white' }}>{department}</Option>
                    ))}
                  </Select>
                </selectWrapper>
              </Form.Item>

              <Form.Item name="Rollno" rules={[{ required: true, message: 'Please input your Roll number!' }]}>
                <Input
                  style={{ backgroundColor: 'transparent', color: 'white' }}
                  className={classes.border}
                  placeholder="Roll number"
                  type="email"
                  disabled={props.isQuickSignup}
                  required
                  value={Rollno}
                  onChange={(e) => setRollno(e.target.value)}
                />

              </Form.Item>

              <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <CustomPasswordInput issmall={props.issmall} sendbackvalue={(value) => setPassword(value)} password={password} />
              </Form.Item>

              <Form.Item name="confirm password" rules={[{ required: true, message: 'Confirm your password!' }]}>
                <CustomConfirmPasswordInput
                  issmall={props.issmall}
                  sendbackvalue={(value) => setConfirmPassword(value)}
                  confirmpassword={confirmpassword}
                />
              </Form.Item>

              <Form.Item>
                <Checkbox style={{ color: 'white' }} onChange={() => setisChecked(!checked)}>
                  I agree to the <a onClick={() => setshowTerms(true)}>Terms and Conditions.</a>
                </Checkbox>
              </Form.Item>

              {error.hasError && <p className="errorText">{error.errorMessage}</p>}

              <Form.Item>
                <Button
                  style={{ backgroundColor: 'transparent', color: 'white' }}
                  type="primary"
                  htmlType="button"
                  className="signup-form-button"
                  onClick={handleSubmit}
                >
                  {loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : `      Sign Up`}

                </Button>
              </Form.Item>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{ color: 'white', margin: 0 }}>Already have an account?&nbsp;&nbsp;</p> <a onClick={handleShowlogin}>Login now!</a>
              </div>
            </Form>
          </>
        )}
      </div>
    </div >
  );
};

const CustomPasswordInput = (props) => {
  return (
    <Input.Password
      style={{ backgroundColor: 'transparent', color: 'white' }}
      placeholder="Password"
      className="border"
      required
      type="password"
      value={props.password}
      onChange={(e) => props.sendbackvalue(e.target.value)}
      iconRender={(visible) => (visible ? <EyeOutlined style={{ color: 'white' }} /> : <EyeInvisibleOutlined style={{ color: props.issmall ? 'white' : 'grey' }} />)}
    />
  );
};

const CustomConfirmPasswordInput = (props) => {
  return (
    <Input.Password
      style={{ backgroundColor: 'transparent', color: 'white' }}
      placeholder="Confirm Password"
      className="border"
      required
      value={props.confirmpassword}
      onChange={(e) => props.sendbackvalue(e.target.value)}
      iconRender={(visible) => (visible ? <EyeOutlined style={{ color: props.issmall ? 'white' : 'black' }} /> : <EyeInvisibleOutlined style={{ color: props.issmall ? 'white' : 'grey' }} />)}
    />
  );
};


const useStyles = makeStyles({

  border: {
    '&::placeholder': {
      color: 'white'
    },
  },
});

export default SignUp;
