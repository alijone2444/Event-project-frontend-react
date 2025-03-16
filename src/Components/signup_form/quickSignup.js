import React, { useState, useEffect } from 'react';
import { Button, Input, Modal } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { CircularProgress } from '@mui/material';
import constants from '../../Constants/constants';
import getFullDepartmentName from '../functions/FetchcomparedDepartment';
const QuickSignup = ({ inputString, onConfirm, showLogin }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: 'N/A', department: 'N/A', rollno: 'N/A' });

    // Function to analyze the input string and extract fields
    const analyzeInputString = (string) => {
        console.log("input is:", string);
        let input = string[0];

        // Ensure the input is a valid string
        if (typeof input !== "string") {
            console.error("Invalid input:", input);
            return { name: "N/A", department: "N/A", rollno: "N/A" };
        }

        // Split the input by newlines and remove empty lines
        const lines = input.split("\n").map(line => line.trim()).filter(line => line.length > 0);

        // Ensure there are at least 3 meaningful lines after removing the first
        if (lines.length < 3) {
            console.error("Invalid format: Expected at least 3 lines after the first.");
            return { name: "N/A", department: "N/A", rollno: "N/A" };
        }

        // Extract name, department, and roll number
        const name = lines[1]; // Second line is the username
        let department = lines[2]; // Third line is the department
        const rollno = lines[3].match(/\d{9}/) ? lines[3].match(/\d{9}/)[0] : "N/A"; // Extract 9-digit roll number
        // const rollno = lines[3].match(/\d+/) ? lines[3].match(/\d+/)[0] : "N/A"; 

        // Find the best matching department from departmentOptions
        const matchedDepartment = getFullDepartmentName(department)
        // If a match is found, use it; otherwise, keep the extracted department
        department = matchedDepartment || department;

        return { name, department, rollno };
    };

    // Use useEffect to process inputString when it changes

    useEffect(() => {
        if (inputString) {
            console.log(inputString);
            try {
                const extractedInfo = analyzeInputString(inputString);
                setUserInfo(extractedInfo);

                // Show a pop-up message to verify credentials
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
                    <label>Department:</label>
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
                        {userInfo.department}
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