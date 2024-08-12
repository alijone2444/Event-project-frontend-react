import React from 'react';
import { Card, Typography, Divider, Col, Row, Skeleton } from 'antd';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

// Ant Design colors
const colors = {
    primary: '#1E90FF', // Dodger Blue
    background: '#FFFFFF', // White
    text: '#333333',
    completed: '#FF0000' // Red for completed
};

// Function to format time with leading zeros if needed
const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};

// Function to combine startDate and startTime into a full Date object
const getCombinedDateTime = (date, time) => {
    if (!date || !time) return new Date(); // Return current date if date or time is missing
    const datePart = date.split('T')[0]; // Extract date part
    const formattedTime = formatTime(time); // Format time with leading zeros
    const combinedDateTime = `${datePart}T${formattedTime}:00Z`; // Combine date and time with seconds and timezone
    return new Date(combinedDateTime);
};

function TimerComponent({ startDate, startTime }) {
    const combinedDate = getCombinedDateTime(startDate, startTime);
    const now = new Date();

    const isDataMissing = !startDate || !startTime;
    const isPast = !isDataMissing && now > combinedDate;
    const timeRemaining = !isDataMissing && !isPast ? Math.max(0, (combinedDate - now) / 1000) : 0;

    // Total duration in seconds for the countdown (set to 86400 for 24 hours)
    const totalDuration = 86400;

    return (
        <Row justify="center">
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Card
                    style={{
                        backgroundColor: colors.background,
                        textAlign: 'center',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                        margin: '20px auto',
                        width: '100%' // Full width
                    }}
                >
                    <Typography.Title level={3} style={{ color: colors.primary }}>
                        Next Event Countdown
                    </Typography.Title>
                    <Divider />
                    {isDataMissing ? (
                        <Skeleton active paragraph={{ rows: 4 }} />
                    ) : isPast ? (
                        <Typography.Text style={{ fontSize: '1.5rem', color: colors.completed }}>
                            Passed
                        </Typography.Text>
                    ) : (
                        <Row justify="center">
                            <Col style={{ padding: '2%' }}>
                                <CountdownCircleTimer
                                    isPlaying
                                    duration={totalDuration}
                                    initialRemainingTime={timeRemaining}
                                    colors={colors.primary}
                                    strokeWidth={6}
                                    size={100}
                                    trailColor={colors.background}
                                    onComplete={() => console.log('Countdown completed')}
                                >
                                    {({ remainingTime }) => (
                                        <Typography.Text style={{ fontSize: '1.2rem', color: colors.primary }}>
                                            {Math.floor(remainingTime / 86400)}<br />days
                                        </Typography.Text>
                                    )}
                                </CountdownCircleTimer>
                            </Col>
                            <Col style={{ padding: '2%' }}>
                                <CountdownCircleTimer
                                    isPlaying
                                    duration={86400}
                                    initialRemainingTime={timeRemaining % 86400}
                                    colors={colors.primary}
                                    strokeWidth={6}
                                    size={100}
                                    trailColor={colors.background}
                                    onComplete={() => console.log('Countdown completed')}
                                >
                                    {({ remainingTime }) => (
                                        <Typography.Text style={{ fontSize: '1.2rem', color: colors.primary }}>
                                            {String(Math.floor((remainingTime % 86400) / 3600)).padStart(2, '0')}<br />hrs
                                        </Typography.Text>
                                    )}
                                </CountdownCircleTimer>
                            </Col>
                            <Col style={{ padding: '2%' }}>
                                <CountdownCircleTimer
                                    isPlaying
                                    duration={3600}
                                    initialRemainingTime={timeRemaining % 3600}
                                    colors={colors.primary}
                                    strokeWidth={6}
                                    size={100}
                                    trailColor={colors.background}
                                    onComplete={() => console.log('Countdown completed')}
                                >
                                    {({ remainingTime }) => (
                                        <Typography.Text style={{ fontSize: '1.2rem', color: colors.primary }}>
                                            {String(Math.floor((remainingTime % 3600) / 60)).padStart(2, '0')}<br />mins
                                        </Typography.Text>
                                    )}
                                </CountdownCircleTimer>
                            </Col>
                            <Col style={{ padding: '2%' }}>
                                <CountdownCircleTimer
                                    isPlaying
                                    duration={60}
                                    initialRemainingTime={timeRemaining % 60}
                                    colors={colors.primary}
                                    strokeWidth={6}
                                    size={100}
                                    trailColor={colors.background}
                                    onComplete={() => {
                                        // do your stuff here
                                        return { shouldRepeat: true, delay: 1.5 } // repeat animation in 1.5 seconds
                                    }}
                                >
                                    {({ remainingTime }) => (
                                        <Typography.Text style={{ fontSize: '1.2rem', color: colors.primary }}>
                                            {String(remainingTime % 60).padStart(2, '0')}<br />secs
                                        </Typography.Text>
                                    )}
                                </CountdownCircleTimer>
                            </Col>
                        </Row>
                    )}
                </Card>
            </Col>
        </Row>
    );
}

export default TimerComponent;
