import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup_form.css'
import TermsAndConditions from './termsAndConditions';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const SignUp = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [showBorder, setshowBorder] = useState(false);
  const [showTerms,setshowTerms] = useState(false)

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const handleSubmit = async () => {
    try {
      // Assuming you have a backend endpoint for user registration
      const response = await axios.post('http://localhost:3002/signup', {
        email: email,
        password: password,
      });

      // Handle the response on successful registration
      console.log(response.data);

      if (response.data.success === true) {
        navigate('/'); // Redirect to login page after successful registration
      } else {
        // Handle unsuccessful registration
        console.error('Registration failed:', response.data.message);
        setError(true);
      }
    } catch (err) {
      // Handle the error
      console.error('Error:', err);
      setError(true);
    }
  };
  
  const handleShowlogin=()=>{
    setshowBorder(true)
    setTimeout(() => {
      props.showSignIn();
    }, 1000);
  }

  const CustomConfirmPasswordInput = () => {
    return (
      <Input.Password
        style={{ width: '250PX', backgroundColor: props.issmall ? 'transparent' : 'white', color: props.issmall ? 'white' : 'black' }}
        placeholder="Confirm Password"
        className='border'
        required
        value={confirmpassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
          iconRender={(visible) =>
        visible ? (
          <EyeOutlined style={{ color: props.issmall?'lightwhite':'black' }} />
        ) : (
          <EyeInvisibleOutlined style={{ color:props.issmall? 'lightwhite':'grey' }} />
        )
      }
    />
    );
  };
  
  const CustomPasswordInput = () => {
    return (
      <Input.Password
        style={{ width: '250PX', backgroundColor: props.issmall ? 'transparent' : 'white', color: props.issmall ? 'white' : 'black' }}
        placeholder="Password"
        className='border'
        required
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
  return (
    <div className="signup-container">
      <div className="signup-form-container">
        {showBorder && <><span class="top"></span>
        </>}
        {showTerms 
            ?
        <TermsAndConditions gobackToSignup={()=>{setshowTerms(false)}}/>
            :
        <>    
            <h2 className="signup-title">Sign Up</h2>
            <Form
                name="signupForm"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
                >
                <Input
                    style={{ width: '250PX', backgroundColor: props.issmall ? 'transparent' : 'white', color: props.issmall ? 'white' : 'black' }}
                    className='border'
                    placeholder="Email"
                    type="email"
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

                <Form.Item
                name="confirm password"
                rules={[{ required: true, message: 'Confirm your password!' }]}
                >
                <CustomConfirmPasswordInput/>
                </Form.Item>

                <Form.Item>
                <Checkbox style={{ color: 'white' }}>I agree to the <a onClick={()=>{setshowTerms(true)}}>Terms and Conditions.</a></Checkbox>
                </Form.Item>

                {error && <p className="error-text">Registration failed. Please try again.</p>}

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
                <div style={{display:'flex',flexDirection:'row'}}>
                <p style={{ color: 'white', margin: 0 }}>Already have an account?&nbsp;&nbsp;</p> <a onClick={handleShowlogin}>Login now!</a>
                </div>
            </Form>
        </>
        }
      </div>
    </div>
  );
};

export default SignUp;
