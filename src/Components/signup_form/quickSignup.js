import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { CircularProgress } from '@mui/material';

const QuickSignup = ({ inputString, onConfirm, showLogin }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: 'N/A', department: 'N/A', rollno: 'N/A' });
    const analyzeInputString = (input) => {
        console.log("input is ", input);

        // Ensure the input is a string
        if (typeof input !== 'string') {
            console.error('Input is not a string:', input);
            return { name: 'N/A', rollno: 'N/A', department: 'N/A' };
        }

        // Split the input by newline characters and trim each line
        const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        // Initialize variables
        let name = 'N/A';
        let department = 'N/A';
        let rollno = 'N/A';

        // Extract name, department, and roll number
        if (lines.length >= 1) {
            // Name is usually the first line
            name = lines[0].replace(/[^a-zA-Z ]/g, '').trim(); // Remove special characters
        }

        // Extract department and roll number
        for (const line of lines) {
            // Department is usually in the format "CS:02 B" or "85 (CS)2"
            if (line.match(/[A-Za-z]{2}:\d{2} [A-Za-z]|\d{2} \(C[A-Za-z]\)\d/)) {
                department = line.replace(/[^a-zA-Z0-9:() ]/g, '').trim(); // Clean up the department string
            }

            // Roll number is usually a 9-digit number
            if (line.match(/\d{9}/)) {
                rollno = line.match(/\d{9}/)[0]; // Extract the 9-digit roll number
            }
        }

        return { name, department, rollno };
    };
    // Use useEffect to process inputString when it changes
    useEffect(() => {
        if (inputString) {
            console.log(inputString);
            const extractedInfo = analyzeInputString(inputString);
            setUserInfo(extractedInfo);
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
                    <div style={{ color: 'white' }}>
                        {inputString[0].split('\n').map((line, index) => (
                            <div key={index}>{line}</div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default QuickSignup;