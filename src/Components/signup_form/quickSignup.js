import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, message, Tag } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { CircularProgress } from '@mui/material';
import constants from '../../Constants/constants';
import getFullDepartmentName from '../functions/FetchcomparedDepartment';

const QuickSignup = ({ inputString, showLogin }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: 'N/A', department: 'N/A', rollno: 'N/A' });
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false)
    const analyzeInputString = (string) => {
        // console.log("input is:", string);
        let input = string[0];

        if (typeof input !== "string") {
            console.error("Invalid input:", input);
            return { name: "N/A", department: "N/A", rollno: "N/A" };
        }

        const lines = input.split("\n").map(line => line.trim()).filter(line => line.length > 0);

        if (lines.length < 3) {
            console.error("Invalid format: Expected at least 3 lines after the first.");
            return { name: "N/A", department: "N/A", rollno: "N/A" };
        }

        const name = lines[1];
        let department = lines[2];
        const rollno = lines[3].match(/\d{9}/) ? lines[3].match(/\d{9}/)[0] : "N/A";

        const matchedDepartment = getFullDepartmentName(department);
        department = matchedDepartment || department;
        if (matchedDepartment) {
            setIsCorrect(true)
        }
        else {
            setIsCorrect(false)
        }

        return { name, department, rollno };
    };

    useEffect(() => {
        if (inputString) {
            // console.log(inputString);
            try {
                const extractedInfo = analyzeInputString(inputString);
                setUserInfo(extractedInfo);
                Modal.info({
                    title: 'Verify Credentials',
                    content: 'Please ensure the extracted credentials are correct, as they cannot be changed later.',
                    okText: 'OK',
                });
            } catch (error) {
                console.error("Error analyzing input string:", error);
            }
        }
    }, [inputString]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (
                userInfo.name !== 'N/A' &&
                userInfo.department !== 'N/A' &&
                userInfo.rollno !== 'N/A' &&
                email &&
                password &&
                confirmPassword &&
                password === confirmPassword &&
                password.length >= 8
            ) {
                const rollnoInteger = parseInt(userInfo.rollno, 10);
                if (isNaN(rollnoInteger)) {
                    message.error('Invalid Roll number. Please enter a valid integer.');
                    return;
                }

                // Simulate an API call
                const response = await fetch(`${constants.BASE_URL}quick-signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        Email: email,
                        Rollno: rollnoInteger,
                        password: password,
                        department: userInfo.department,
                    }),
                });

                const data = await response.json();
                if (data.success) {
                    setSuccessModalVisible(true);
                } else {
                    message.error(data.message || 'Signup failed');
                }
            } else {
                message.error('Please fill all fields correctly');
            }
        } catch (err) {
            console.error('Error:', err);
            message.error('An error occurred during signup');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form-container">
                <h2 className="quick-signup-title">Verify and Confirm</h2>
                <Tag
                    color="green"
                    style={{
                        fontSize: '0.6em',
                        padding: '4px 8px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        position: 'absolute',
                        top: 0,
                        right: 0
                    }}
                >
                    Verified User
                </Tag>
                <div style={{ marginBottom: '10px' }}>
                    <label>Name:</label>
                    <div
                        style={{
                            textAlign: 'center',
                            fontFamily: 'Courier New, Courier, monospace',
                            fontSize: '1em',
                            fontWeight: 'bold',
                            color: userInfo.name === 'N/A' ? 'red' : 'lightgreen',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            padding: '10px',
                            borderRadius: '5px',
                        }}
                    >
                        {userInfo.name}
                    </div>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Department:</label>
                    <div
                        style={{
                            textAlign: 'center',
                            fontFamily: 'Courier New, Courier, monospace',
                            fontSize: '1em',
                            fontWeight: 'bold',
                            color: isCorrect ? 'lightgreen' : 'red',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            padding: '10px',
                            borderRadius: '5px',
                        }}
                    >
                        {userInfo.department}
                    </div>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Roll Number:</label>
                    <div
                        style={{
                            textAlign: 'center',
                            fontFamily: 'Courier New, Courier, monospace',
                            fontSize: '1em',
                            fontWeight: 'bold',
                            color: userInfo.rollno === 'N/A' ? "red" : 'lightgreen',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            padding: '10px',
                            borderRadius: '5px',
                        }}
                    >
                        {userInfo.rollno}
                    </div>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Email:</label>
                    <Input
                        style={{ backgroundColor: 'transparent', color: 'white' }}
                        placeholder="Email address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border"
                    />
                    <p style={{ color: 'orange', fontSize: '0.6em', padding: '2%' }}>**In case you forgot the password in future**</p>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Password:</label>
                    <Input.Password
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        iconRender={(visible) =>
                            visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                        }
                        style={{ backgroundColor: 'transparent', color: 'white' }}
                        className="border"
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Confirm Password:</label>
                    <Input.Password
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        iconRender={(visible) =>
                            visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                        }
                        style={{ backgroundColor: 'transparent', color: 'white' }}
                        className="border"
                    />
                </div>

                <div className="button-container" style={{ marginTop: '25px', display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        style={{ backgroundColor: 'transparent', color: 'white' }}
                        type="primary"
                        htmlType="button"
                        className="signup-form-button"
                        onClick={showLogin}
                    >
                        Retry
                    </Button>

                    <Button
                        style={{ backgroundColor: 'transparent', color: 'white' }}
                        type="primary"
                        htmlType="button"
                        className="signup-form-button"
                        onClick={handleSubmit}
                        disabled={loading || password !== confirmPassword}
                    >
                        {loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : 'Submit'}
                    </Button>
                </div>
            </div>

            <Modal
                title="Signup Successful"
                visible={successModalVisible}
                onOk={() => {
                    setSuccessModalVisible(false);
                    showLogin();
                }}
                onCancel={() => { setSuccessModalVisible(false); showLogin() }}
                okText="Back to Login"
            >
                <p>Signed up successfully!</p>
            </Modal>
        </div>
    );
};

export default QuickSignup;