import React, { useState, useEffect } from 'react';
import { Card, Button, Progress, Space, Typography, Tag, Divider, Radio, Checkbox, Input, message } from 'antd';
import { CheckCircleFilled, TableOutlined, BulbOutlined, CheckSquareFilled, CameraFilled, CheckOutlined } from '@ant-design/icons';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import pollService from '../../services/pollService';
import { pollTypes } from '../../Constants/constants';
import './PollDisplay.css';

const { Text, Title } = Typography;
const { TextArea } = Input;

const PollDisplay = ({ pollType = 'regular' }) => {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [votingStates, setVotingStates] = useState({});
    const [responses, setResponses] = useState({});

    useEffect(() => {
        fetchPolls();
    }, [pollType]);

    const fetchPolls = async () => {
        try {
            setLoading(true);
            const data = await pollService.getActivePolls(pollType);
            setPolls(data.polls || data || []);
        } catch (error) {
            console.error('Error fetching polls:', error);
            message.error('Failed to load polls');
        } finally {
            setLoading(false);
        }
    };

    const handleVote = async (pollId, optionId) => {
        try {
            setVotingStates(prev => ({ ...prev, [pollId]: true }));
            await pollService.voteOnPoll(pollId, optionId);
            message.success('Vote submitted successfully!');
            fetchPolls(); // Refresh polls to get updated results
        } catch (error) {
            message.error('Failed to submit vote');
        } finally {
            setVotingStates(prev => ({ ...prev, [pollId]: false }));
        }
    };

    const handleSurveyResponse = async (pollId) => {
        try {
            setVotingStates(prev => ({ ...prev, [pollId]: true }));
            await pollService.submitSurveyResponse(pollId, responses[pollId]);
            message.success('Survey submitted successfully!');
            setResponses(prev => ({ ...prev, [pollId]: {} }));
            fetchPolls();
        } catch (error) {
            message.error('Failed to submit survey');
        } finally {
            setVotingStates(prev => ({ ...prev, [pollId]: false }));
        }
    };

    const getPollTypeIcon = (pollType) => {
        const type = pollTypes.find(t => t.type === pollType);
        return type ? type.icon : <CheckOutlined />;
    };

    const getPollTypeColor = (pollType) => {
        const type = pollTypes.find(t => t.type === pollType);
        return type ? type.color : '#13c2c2';
    };

    const renderPollContent = (poll) => {
        switch (poll.pollType) {
            case 'voting':
                if (!poll.options || poll.options.length === 0) {
                    // Open poll style
                    return (
                        <div>
                            <Button
                                type="primary"
                                disabled={poll.isVoted}
                                loading={votingStates[poll._id]}
                                onClick={() => handleVote(poll._id)}
                                style={{ marginBottom: 12 }}
                            >
                                {poll.isVoted ? 'Voted' : 'Vote'}
                            </Button>
                            <div style={{ marginTop: 8 }}>
                                <Text strong>Total Votes: {poll.votesCount ?? 0}</Text>
                                <Progress
                                    percent={poll.votesCount ? Math.min((poll.votesCount / 100) * 100, 100) : 0}
                                    showInfo={false}
                                    style={{ marginTop: 8 }}
                                />
                            </div>
                        </div>
                    );
                }
                // Classic voting with options
                return (
                    <div>
                        <Text strong>Options:</Text>
                        <Space direction="vertical" style={{ width: '100%', marginTop: 8 }}>
                            {poll.options.map((option, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Button
                                        type="primary"
                                        size="small"
                                        loading={votingStates[poll._id]}
                                        onClick={() => handleVote(poll._id, option._id || index)}
                                        style={{ minWidth: 80 }}
                                        disabled={poll.isVoted}
                                    >
                                        Vote
                                    </Button>
                                    <div style={{ flex: 1 }}>
                                        <Text>{option.text || option}</Text>
                                        {option.votes !== undefined && (
                                            <Progress
                                                percent={poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0}
                                                size="small"
                                                showInfo={false}
                                            />
                                        )}
                                    </div>
                                    {option.votes !== undefined && (
                                        <Text type="secondary">{option.votes} votes</Text>
                                    )}
                                </div>
                            ))}
                        </Space>
                    </div>
                );

            case 'survey':
                return (
                    <div>
                        <Text strong>Questions:</Text>
                        <Space direction="vertical" style={{ width: '100%', marginTop: 8 }}>
                            {poll.questions?.map((question, qIndex) => (
                                <div key={qIndex} style={{ border: '1px solid #f0f0f0', padding: 12, borderRadius: 6 }}>
                                    <Text strong>{question.question}</Text>
                                    <div style={{ marginTop: 8 }}>
                                        {question.type === 'mcq' && (
                                            <Radio.Group
                                                onChange={(e) => setResponses(prev => ({
                                                    ...prev,
                                                    [poll._id]: { ...prev[poll._id], [qIndex]: e.target.value }
                                                }))}
                                                value={responses[poll._id]?.[qIndex]}
                                            >
                                                <Space direction="vertical">
                                                    {question.options?.map((option, oIndex) => (
                                                        <Radio key={oIndex} value={option}>{option}</Radio>
                                                    ))}
                                                </Space>
                                            </Radio.Group>
                                        )}
                                        {question.type === 'rating' && (
                                            <Radio.Group
                                                onChange={(e) => setResponses(prev => ({
                                                    ...prev,
                                                    [poll._id]: { ...prev[poll._id], [qIndex]: e.target.value }
                                                }))}
                                                value={responses[poll._id]?.[qIndex]}
                                            >
                                                <Space>
                                                    {[1, 2, 3, 4, 5].map(rating => (
                                                        <Radio key={rating} value={rating}>{rating}</Radio>
                                                    ))}
                                                </Space>
                                            </Radio.Group>
                                        )}
                                        {question.type === 'text' && (
                                            <TextArea
                                                rows={2}
                                                placeholder="Enter your response"
                                                onChange={(e) => setResponses(prev => ({
                                                    ...prev,
                                                    [poll._id]: { ...prev[poll._id], [qIndex]: e.target.value }
                                                }))}
                                                value={responses[poll._id]?.[qIndex] || ''}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </Space>
                        <Button
                            type="primary"
                            onClick={() => handleSurveyResponse(poll._id)}
                            loading={votingStates[poll._id]}
                            style={{ marginTop: 12 }}
                        >
                            Submit Survey
                        </Button>
                    </div>
                );

            case 'free_table':
                return (
                    <div>
                        <Text strong>Fields:</Text>
                        <Space direction="vertical" style={{ width: '100%', marginTop: 8 }}>
                            {poll.fields?.map((field, index) => (
                                <div key={index}>
                                    <Text>{field.label || field}</Text>
                                    <Input placeholder="Enter your response" style={{ marginTop: 4 }} />
                                </div>
                            ))}
                        </Space>
                        <Button type="primary" style={{ marginTop: 12 }}>
                            Submit Response
                        </Button>
                    </div>
                );

            case 'collect_ideas':
                return (
                    <div>
                        <Text strong>Format: {poll.format}</Text>
                        <div style={{ marginTop: 8 }}>
                            <TextArea
                                rows={3}
                                placeholder="Share your idea..."
                                style={{ marginBottom: 8 }}
                            />
                            <Button type="primary">
                                Submit Idea
                            </Button>
                        </div>
                    </div>
                );

            case 'photo_contest':
                return (
                    <div>
                        <Text strong>Requirements: {poll.requirements}</Text>
                        <div style={{ marginTop: 8 }}>
                            <Button type="primary">
                                Upload Photo
                            </Button>
                        </div>
                    </div>
                );

            case 'open_poll':
                return (
                    <div>
                        <Button
                            type="primary"
                            disabled={poll.isVoted}
                            loading={votingStates[poll._id]}
                            onClick={() => handleVote(poll._id)}
                        >
                            {poll.isVoted ? 'Voted' : 'Vote'}
                        </Button>
                        <div style={{ marginTop: 8 }}>
                            <Text strong>Total Votes: {poll.votesCount ?? 0}</Text>
                        </div>
                    </div>
                );

            default:
                return <Text>Unsupported poll type</Text>;
        }
    };

    if (loading) {
        return (
            <div className="skeleton-container">
                <Title level={4}>Active Polls</Title>
                <div className="skeleton-grid">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="skeleton-card">
                            <Skeleton height={20} width="60%" style={{ marginBottom: 8 }} />
                            <Skeleton height={16} width="40%" style={{ marginBottom: 16 }} />
                            <Skeleton height={60} count={2} style={{ marginBottom: 8 }} />
                            <Skeleton height={32} width="30%" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (polls.length === 0) {
        return (
            <div className="empty-state">
                <Title level={4}>Active Polls</Title>
                <Text type="secondary">No active polls available at the moment.</Text>
            </div>
        );
    }

    return (
        <div className="poll-display-container">
            <Title level={4}>Active Polls</Title>
            <div className="poll-grid">
                {polls.map((poll) => (
                    <Card
                        key={poll._id}
                        className="poll-card"
                        title={
                            <div className="poll-header">
                                {getPollTypeIcon(poll.pollType)}
                                <span className="poll-title">{poll.title}</span>
                                <Tag className="poll-tag" color={getPollTypeColor(poll.pollType)}>
                                    {poll?.pollType?.replace('_', ' ')}
                                </Tag>
                            </div>
                        }
                        style={{ width: '100%' }}
                    >
                        <div className="poll-content">
                            {poll.eventName && (
                                <div className="poll-event-name">
                                    <Text type="secondary">Event: {poll.eventName}</Text>
                                </div>
                            )}

                            {poll.description && (
                                <div className="poll-description">
                                    <Text>{poll.description}</Text>
                                </div>
                            )}

                            {poll.deadline && (
                                <div className="poll-deadline">
                                    <Text type="secondary">
                                        Deadline: {new Date(poll.deadline).toLocaleDateString()}
                                    </Text>
                                </div>
                            )}

                            <Divider className="poll-divider" />

                            {renderPollContent(poll)}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PollDisplay; 