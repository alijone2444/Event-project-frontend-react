import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { CircularProgress } from '@mui/material';

const QuickSignup = ({ inputString, onConfirm, showLogin }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: 'N/A', rollno: 'N/A', department: 'N/A' });

    const analyzeInputString = (input) => {
        console.log("input is ", input);

        // Ensure the input is a string
        if (typeof input !== 'string') {
            console.error('Input is not a string:', input);
            return { name: 'N/A', rollno: 'N/A', department: 'N/A' };
        }

        // Split the input by newline characters
        const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        console.log(input)
        let name = 'N/A';
        let rollno = 'N/A';
        let department = 'N/A';

        // Extract name, roll number, and department
        if (lines.length >= 1) {
            name = lines[0]; // First line is the name
        }
        if (lines.length >= 2) {
            department = lines[1]; // Second line is the department
        }
        if (lines.length >= 3) {
            rollno = lines[2]; // Third line is the roll number
        }

        return { name, rollno, department };
    };

    // Use useEffect to process inputString when it changes
    useEffect(() => {
        if (inputString) {
            console.log(inputString);
            const { name, rollno, department } = analyzeInputString(inputString);
            setUserInfo({ name, rollno, department });
        }
    }, [inputString]);

    const handleConfirm = () => {
        setLoading(true);
        // Simulate an async operation (e.g., API call)
        setTimeout(() => {
            setLoading(false);
            onConfirm({ ...userInfo, password });
        }, 1000);
    };

    return (
        <div className="signup-container">
            <div className="signup-form-container">
                <h2 className="signup-title">Verify and Confirm</h2>

                {/* Non-editable fields */}
                <div style={{ marginBottom: '20px' }}>
                    <label>Name:</label>
                    <div
                        style={{
                            textAlign: 'center',
                            fontFamily: 'Courier New, Courier, monospace',
                            fontSize: '1.2em',
                            fontWeight: 'bold',
                            color: '#ffffff',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            padding: '10px',
                            borderRadius: '5px',
                        }}
                    >
                        {userInfo.name}
                    </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label>Roll Number:</label>
                    <div
                        style={{
                            textAlign: 'center',
                            fontFamily: 'Courier New, Courier, monospace',
                            fontSize: '1.2em',
                            fontWeight: 'bold',
                            color: '#ffffff',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            padding: '10px',
                            borderRadius: '5px',
                        }}
                    >
                        {userInfo.rollno}
                    </div>
                </div>

                {/* Editable password fields */}
                <div style={{ marginBottom: '20px' }}>
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

                <div style={{ marginBottom: '20px' }}>
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

                {/* Buttons */}
                <div className="button-container">
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
                        style={{ backgroundColor: 'transparent', color: 'white', marginBottom: '5%' }}
                        type="primary"
                        htmlType="button"
                        className="signup-form-button"
                        onClick={handleConfirm}
                        disabled={loading || password !== confirmPassword}
                    >
                        {loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : 'Confirm'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default QuickSignup;