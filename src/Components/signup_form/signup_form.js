import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup_form.css';
import TermsAndConditions from './termsAndConditions';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import constants from '../../Constants/constants';

const { Option } = Select;

const SignUp = (props) => {
  const [Rollno, setRollno] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({ hasError: false, errorMessage: '' });
  const navigate = useNavigate();
  const [showBorder, setshowBorder] = useState(false);
  const [showTerms, setshowTerms] = useState(false);
  const [checked, setisChecked] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const handleSubmit = async () => {
    try {
      console.log(checked);
      if (
        checked &&
        Rollno &&
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
          Rollno: rollnoInteger, // Use the parsed integer value
          password: password,
          department: selectedDepartment,
        });

        // Handle the response on successful registration
        console.log(response.data);

        if (response.data.success === true) {
          navigate('/request'); // Redirect to the login page after successful registration
        } else {
          if (response.data.success === false) {
            setError({ hasError: true, errorMessage: 'User already exists' });
          }
        }
      } else {
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
      <div className="signup-form-container">
        {showBorder && <><span className="top"></span></>}
        {showTerms ? (
          <TermsAndConditions gobackToSignup={() => setshowTerms(false)} />
        ) : (
          <>
            <h2 className="signup-title">Sign Up</h2>
            <Form name="signupForm" initialValues={{ remember: true }} onFinish={onFinish}>

              <Form.Item name="department" rules={[{ required: true, message: 'Please select your department!' }]}>
                <Select
                  placeholder="Select Department"
                  style={{ width: '250PX', backgroundColor: props.issmall ? 'transparent' : 'white', color: props.issmall ? 'white' : 'black' }}
                  onChange={(value) => setSelectedDepartment(value)}
                >
                  {constants.departmentOptions.map((department, index) => (
                    <Option key={index} value={department}>{department}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="Rollno" rules={[{ required: true, message: 'Please input your Roll number!' }]}>
                <Input
                  style={{ width: '250PX', backgroundColor: props.issmall ? 'transparent' : 'white', color: props.issmall ? 'white' : 'black' }}
                  className="border"
                  placeholder="Roll number"
                  type="email"
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
                  style={{ backgroundColor: props.issmall ? 'transparent' : 'white', color: props.issmall ? 'white' : 'black' }}
                  type="primary"
                  htmlType="button"
                  className="signup-form-button"
                  onClick={handleSubmit}
                >
                  Sign Up
                </Button>
              </Form.Item>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{ color: 'white', margin: 0 }}>Already have an account?&nbsp;&nbsp;</p> <a onClick={handleShowlogin}>Login now!</a>
              </div>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

const CustomPasswordInput = (props) => {
  return (
    <Input.Password
      style={{ width: '250PX', backgroundColor: props.issmall ? 'transparent' : 'white', color: props.issmall ? 'white' : 'black' }}
      placeholder="Password"
      className="border"
      required
      type="password"
      value={props.password}
      onChange={(e) => props.sendbackvalue(e.target.value)}
      iconRender={(visible) => (visible ? <EyeOutlined style={{ color: props.issmall ? 'white' : 'black' }} /> : <EyeInvisibleOutlined style={{ color: props.issmall ? 'white' : 'grey' }} />)}
    />
  );
};

const CustomConfirmPasswordInput = (props) => {
  return (
    <Input.Password
      style={{ width: '250PX', backgroundColor: props.issmall ? 'transparent' : 'white', color: props.issmall ? 'white' : 'black' }}
      placeholder="Confirm Password"
      className="border"
      required
      value={props.confirmpassword}
      onChange={(e) => props.sendbackvalue(e.target.value)}
      iconRender={(visible) => (visible ? <EyeOutlined style={{ color: props.issmall ? 'white' : 'black' }} /> : <EyeInvisibleOutlined style={{ color: props.issmall ? 'white' : 'grey' }} />)}
    />
  );
};

export default SignUp;
