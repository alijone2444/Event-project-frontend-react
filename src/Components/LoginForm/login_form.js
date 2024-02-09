import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import './Loginform.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setBooleanState } from '../../ReduxStore/actions/action';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';


const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const classes = useStyles();
  const [showBorder, setshowBorder] = useState(false);
  const booleanState = useSelector((state) => state.boolean.booleanState);
  const dispatch = useDispatch();


  const onFinish = (values) => {
    console.log('Received values:', values);
  };
  const CustomPasswordInput = () => {
    return (
      <Input.Password
      className='border'
      style={{ backgroundColor: props.issmall ? 'transparent' : 'white', color: props.issmall ? 'white' : 'black' }}
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      iconRender={(visible) =>
        visible ? (
          <EyeOutlined style={{ color: props.issmall?'white':'black' }} />
        ) : (
          <EyeInvisibleOutlined style={{ color:props.issmall? 'white':'grey' }} />
        )
      }
    />
    );
  };
  
  
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3002/login', {
        username: email,
        password: password,
      });

      // Handle the response on successful login
      console.log(response.data);

      if (response.data.success === true) {
        navigate('/Home');
      } else {
        // Handle unsuccessful login
        // For example, display an error message to the user
        console.error('Login failed:', response.data.message);
        setError(true);
      }
    } catch (err) {
      // Handle the error
      // For example, redirect to a login page or display an error message
      console.error('Error:', err);
      setError(true);
    }
  };
  const handleShowSignup=()=>{
    setshowBorder(true)
    setTimeout(() => {
      props.showSignup();
    }, 1000);
  }
  return (
    <div className="login-container">
      <div className="login-form-container">
      {showBorder && <><span class="top"></span>
      </>}
        <h2 className="login-title">Login</h2>
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              className='border'
              style={{ width: '250PX', backgroundColor: props.issmall ? 'transparent' : 'white', color: props.issmall ? 'white' : 'black' }}
              placeholder="Username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <CustomPasswordInput/>
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ color: 'white' }}>Remember me</Checkbox>
            </Form.Item>

            <a style={{float:'right',color: 'dodgerblue'}} >
              Forgot password?
            </a>
          </Form.Item>
          {error && <p className={classes.errorText}>Incorrect password or username</p>}
          <Form.Item>
            <Button type="primary" htmlType="button" className="login-form-button" style={{ backgroundColor: props.issmall ? 'transparent' : 'white', color: props.issmall ? 'white' : 'black' }} onClick={handleSubmit}>
              Log in
            </Button>
            <div style={{display:'flex',flexDirection:'row',paddingTop:'5%'}}>
              <p style={{ color: 'white', margin: 0 }}>Already have an account?&nbsp;&nbsp;</p> 
              <a  onClick={handleShowSignup}>register now!</a>
            </div>
          </Form.Item>
          
            <div style={{textAlign:'center',color:'white',marginTop:'20px'}}>
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
