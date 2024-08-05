import React, { useState } from 'react';
import { Form, Input, Button, Typography, notification, Space } from 'antd';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import constants from '../../Constants/constants';
const ForgotPassword = (props) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const showNotification = (type, message) => {
        notification[type]({
            message: message,
            duration: 5, // duration in seconds
            style: {
                color: type === 'error' ? 'red' : 'green',
            },
        });
    };

    const handleSubmit = async (values) => {
        const { email, rollNo } = values;
        setLoading(true);

        try {
            if (!email || !rollNo) {
                showNotification('error', 'Please fill in all fields.');
                setLoading(false);
                return;
            }

            // Replace with your backend API endpoint
            await axios.post(`${constants.BASE_URL}reset-password`, { email, rollNo });

            showNotification('success', 'Reset link sent. Check your email to reset your password.');
        } catch (error) {
            showNotification('error', 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <h2 className='login-title'>Forget Password</h2>

                <Form
                    form={form}
                    onFinish={handleSubmit}
                    style={{ maxWidth: '400px', margin: 'auto' }}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input
                            placeholder="Email Address"
                            className={classes.border}
                            style={{ backgroundColor: 'transparent', color: 'white' }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="rollNo"
                        rules={[{ required: true, message: 'Please input your roll number!' }]}
                    >
                        <Input
                            placeholder="Roll Number"
                            className={classes.border}
                            style={{ backgroundColor: 'transparent', color: 'white' }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            style={{
                                width: '100%',
                                marginBottom: '16px',
                                backgroundColor: '#1890ff', // Default Ant Design primary color
                                borderColor: '#1890ff'
                            }}
                        >
                            Send Reset Link
                        </Button>
                    </Form.Item>
                </Form>

                <Space direction="vertical" size="middle">
                    <Button
                        type="primary"
                        htmlType="button"
                        className="login-form-button"
                        style={{ backgroundColor: 'transparent', color: 'white', zIndex: 1 }}
                        onClick={() => { props.showLoginComeback() }}
                    >
                        {loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : `Go Back`}
                    </Button>
                </Space>
            </div>
        </div>
    );
};

const useStyles = makeStyles({
    border: {
        '&::placeholder': {
            color: 'white'
        },
    },
});

export default ForgotPassword;
