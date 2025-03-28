import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import './Loginform.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import constants from '../../Constants/constants';
import { CircularProgress } from '@mui/material';

import { Space } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const Login = (props) => {
  const [Rollno, setRollno] = useState('');
  const [password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const classes = useStyles();
  const [showBorder, setshowBorder] = useState(false);
  const [loading, setloading] = useState(false);
  const [checked, setChecked] = useState(true);
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const handleSubmit = async () => {
    setloading(true)
    console.log('here')
    try {
      let dataToSend = {
        Rollno: Rollno,
        password: password,
        Email: Email,
        checked, checked
      };

      if (!props.type) {
        dataToSend = {
          ...dataToSend,
          UserType: 'Admin',
        };
      }

      const response = await axios.post(`${constants.BASE_URL}login`, dataToSend);

      // Handle the response on successful login

      if (response.data.success === true && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userType', response.data.userType);
        setloading(false)
        if (props.type) {
          navigate('/Home');
        } else {
          props.showAdmin();
        }
      } else {
        // Handle unsuccessful login
        // For example, display an error message to the user
        console.error('Login failed:', response.data.message);
        setError(true);
        setloading(false)
      }
    } catch (err) {
      setloading(false)
      // Handle the error
      // For example, redirect to a login page or display an error message
      console.error('Error:', err);
      setError(true);
    }
  };

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };
  const handleShowSignup = () => {
    setshowBorder(true)
    setTimeout(() => {
      props.showSignup(true);
    }, 1000);
  }

  const handleShowAdminSignup = () => {

    setshowBorder(true)
    setTimeout(() => {
      props.showSignup(false);
    }, 1000);
  }

  return (
    <div className="login-container">
      <div className="login-form-container">
        {showBorder && <><span class="top"></span>
        </>}
        {props.type ?
          <h2 className="login-title">Login</h2>
          : <h3 className="login-title">Login admin</h3>
        }
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >

          <Form.Item
            style={{ zIndex: 2 }}
            name="Email Address"

            rules={[{ required: true, message: 'Enter your email to link your account!' }]}
          >

            <Input
              className={classes.border}
              style={{ backgroundColor: 'transparent', color: 'white', zIndex: 5 }}
              placeholder="Email Address"
              required
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            style={{ zIndex: 2 }}
            name="Rollno"
            rules={[{ required: true, message: 'Please input your Roll number!' }]}
          >
            <Input
              className={classes.border}
              style={{ backgroundColor: 'transparent', color: 'white', zIndex: 5 }}
              placeholder="Roll number"
              required
              value={Rollno}
              onChange={(e) => setRollno(e.target.value)}

            />
          </Form.Item>


          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your EMS password!' }]}
          >

            <Input.Password
              className={classes.password}
              style={{ backgroundColor: 'transparent', color: 'white', zIndex: 5 }}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Corrected here
              placeholder="Password"
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined style={{ color: props.issmall ? 'white' : 'black' }} />
                ) : (
                  <EyeInvisibleOutlined style={{ color: props.issmall ? 'white' : 'grey' }} />
                )
              }
            />

          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ color: 'white' }} onChange={handleCheckboxChange}
              >Remember me</Checkbox>
            </Form.Item>
            {props.type &&
              <a style={{ float: 'right', color: 'dodgerblue' }} onClick={() => props.forgetPassCallback()}>
                Forgot password?
              </a>}
          </Form.Item>
          {error && <p className={classes.errorText}>Incorrect password or Roll number</p>}
          <Form.Item>
            <Button type="primary" htmlType="button" className="login-form-button" style={{ backgroundColor: 'transparent', color: 'white', zIndex: 1 }} onClick={handleSubmit}>
              {loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : `Log in`}
            </Button>
            {props.type && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: "flex-start", paddingTop: '5%' }}>
                <p style={{ color: 'white', margin: 0, width: '100%' }}>
                  Don't have an account ?&nbsp;&nbsp;
                </p>
                <Button
                  type="link"
                  onClick={handleShowAdminSignup}
                  icon={<ArrowRightOutlined />}
                  style={{ color: 'dodgerblue' }}
                >
                  Request Signup (Admin Approval)
                </Button>
                <Button
                  type="link"
                  onClick={handleShowSignup}
                  icon={<ArrowRightOutlined />}
                  style={{ color: 'dodgerblue' }}
                >
                  Quick Signup (Card Scan)
                </Button>
              </div>
            )}
          </Form.Item>

          <div style={{ textAlign: 'center', color: 'white', marginTop: '20px' }}>
            Copyright @ IstEMS.com
          </div>
        </Form>
      </div>
    </div>
  );
};


const useStyles = makeStyles({
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: '0',
    marginBottom: '0',
    animation: '$blink 1s infinite',
  },
  border: {
    '&::placeholder': {
      color: 'white'
    },
  },
  '@keyframes blink': {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
});

export default Login;
