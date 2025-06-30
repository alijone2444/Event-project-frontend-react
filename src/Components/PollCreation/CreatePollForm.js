import React, { useState, useEffect } from 'react';
import {
    Modal,
    Form,
    Input,
    Button,
    Space,
    Typography,
    DatePicker,
    Checkbox,
    Upload,
    Select,
} from 'antd';
import {
    PlusOutlined,
    MinusCircleOutlined,
    CloseOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import createAuthenticatedRequest from '../../RequestwithHeader';
import constants from '../../Constants/constants';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

const CreatePollForm = ({ open, onClose, pollType, eventId, eventName, pollColor, eventToPrefill }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const requestInstance = createAuthenticatedRequest();

    useEffect(() => {
        if (open) {
            // Prefill deadline with event's deadline if available
            if (pollType === 'voting' && form && eventToPrefill) {
                form.setFieldsValue({
                    deadline: eventToPrefill.registrationDeadline ? moment(eventToPrefill.registrationDeadline) : undefined
                });
            }
            form.resetFields();
            console.log('Poll opened with type:', pollType);
        }
    }, [open, pollType, form, eventToPrefill]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            // Prepare poll data based on pollType
            let pollData = {
                eventId: eventId,
                eventName: eventName,
                pollType: pollType,
            };

            // Format data based on poll type
            switch (pollType) {
                case 'voting':
                    pollData = {
                        ...pollData,
                        title: values.title,
                        options: values.options.map(opt => opt.text), // Extract text from options array
                        votingDeadline: values.deadline?.toISOString(),
                        participantEligibility: values.eligibility,
                        linkedEventId: eventId
                    };
                    break;
                case 'open_poll':
                    pollData = {
                        ...pollData,
                        title: values.title,
                        votingDeadline: values.deadline?.toISOString(),
                        participantEligibility: values.eligibility,
                        linkedEventId: eventId
                    };
                    break;
                case 'free_table':
                    pollData = {
                        ...pollData,
                        title: values.topic,
                        fields: values.fields?.map(field => field.label) || [],
                        linkedEventId: eventId
                    };
                    break;
                case 'collect_ideas':
                    pollData = {
                        ...pollData,
                        title: values.problem,
                        format: values.format,
                        categories: values.categories || [],
                        linkedEventId: eventId
                    };
                    break;
                case 'survey':
                    pollData = {
                        ...pollData,
                        title: values.goal,
                        questions: values.questions || [],
                        anonymous: values.anonymous || false,
                        linkedEventId: eventId
                    };
                    break;
                case 'photo_contest':
                    pollData = {
                        ...pollData,
                        title: values.theme,
                        requirements: values.requirements,
                        deadline: values.deadline?.toISOString(),
                        criteria: values.criteria,
                        linkedEventId: eventId
                    };
                    break;
                default:
                    throw new Error('Invalid poll type');
            }

            console.log('Creating poll with data:', pollData);

            // Make API call
            const response = await requestInstance.post(`${constants.BASE_URL}create-poll`, {
                ...pollData,
                pollType: pollType // Ensure poll type is included in the request
            });

            if (response.data) {
                console.log('Poll created successfully:', response.data);
                // You can add success notification here
                onClose();
            }
        } catch (error) {
            console.error('Error creating poll:', error);
            // You can add error notification here
        } finally {
            setLoading(false);
        }
    };

    const handleFinishFailed = ({ errorFields }) => {
        console.warn('Form validation failed:', errorFields);
    };

    const renderPollFields = () => {
        switch (pollType) {
            case 'voting':
                return (
                    <>
                        <Form.Item
                            name="title"
                            label="Title of the Vote"
                            rules={[{ required: true, message: 'Please enter the title' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.List
                            name="options"
                            validateTrigger={['onChange', 'onBlur']}
                        >
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'text']}
                                                rules={[{ required: true, message: 'Missing option' }]}
                                            >
                                                <Input placeholder="Candidate/Option" />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add Option
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                        <Form.Item
                            name="deadline"
                            label="Voting Deadline"
                            rules={[{ required: true, message: 'Please select a deadline' }]}
                        >
                            <DatePicker showTime style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                            name="eligibility"
                            label="Participant Eligibility"
                            rules={[{ required: true, message: 'Please specify eligibility' }]}
                        >
                            <Input placeholder="e.g. All students, Only members, etc." />
                        </Form.Item>
                    </>
                );

            case 'open_poll':
                return (
                    <>
                        <Form.Item
                            name="title"
                            label="Poll Title"
                            rules={[{ required: true, message: 'Please enter the poll title' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="deadline"
                            label="Deadline"
                            rules={[{ required: true, message: 'Please select a deadline' }]}
                        >
                            <DatePicker showTime style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="eligibility"
                            label="Participant Eligibility"
                            rules={[{ required: true, message: 'Please specify eligibility' }]}
                        >
                            <Input placeholder="e.g. All students, Only members, etc." />
                        </Form.Item>
                    </>
                );

            case 'free_table':
                return (
                    <>
                        <Form.Item
                            name="topic"
                            label="Open-ended Question or Topic"
                            rules={[{ required: true, message: 'Please enter a topic/question' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.List
                            name="fields"
                            validateTrigger={['onChange', 'onBlur']}
                            rules={[
                                {
                                    validator: async (_, fields) => {
                                        if (!fields || fields.length < 1) {
                                            return Promise.reject(new Error('Please add at least one field'));
                                        }
                                    },
                                },
                            ]}
                        >
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'label']}
                                                rules={[{ required: true, message: 'Missing field label' }]}
                                            >
                                                <Input placeholder="Enter label (e.g. Name, Email, etc.)" />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add Field
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </>
                );

            case 'collect_ideas':
                return (
                    <>
                        <Form.Item
                            name="problem"
                            label="Problem Statement / Topic Area"
                            rules={[{ required: true, message: 'Please enter a problem statement or topic' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="format"
                            label="Idea Submission Format"
                            rules={[{ required: true, message: 'Please specify the format' }]}
                        >
                            <Input placeholder="e.g. Text, PDF, Link, etc." />
                        </Form.Item>

                        <Form.Item name="categories" label="Categories/Tags (optional)">
                            <Select mode="tags" style={{ width: '100%' }} placeholder="Add categories or tags" />
                        </Form.Item>
                    </>
                );

            case 'survey':
                return (
                    <>
                        <Form.Item
                            name="goal"
                            label="Survey Goal/Description"
                            rules={[{ required: true, message: 'Please enter the survey goal or description' }]}
                        >
                            <TextArea rows={2} />
                        </Form.Item>

                        <Form.List
                            name="questions"
                            validateTrigger={['onChange', 'onBlur']}
                            rules={[
                                {
                                    validator: async (_, questions) => {
                                        if (!questions || questions.length < 1) {
                                            return Promise.reject(new Error('Please add at least one question'));
                                        }
                                    },
                                },
                            ]}
                        >
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'question']}
                                                rules={[{ required: true, message: 'Missing question' }]}
                                            >
                                                <Input placeholder="Question" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'type']}
                                                rules={[{ required: true, message: 'Select type' }]}
                                            >
                                                <Select placeholder="Type" style={{ width: 120 }}>
                                                    <Option value="mcq">MCQ</Option>
                                                    <Option value="rating">Rating</Option>
                                                    <Option value="text">Text</Option>
                                                </Select>
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add Question
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                        <Form.Item name="anonymous" valuePropName="checked" initialValue={false}>
                            <Checkbox>Responses are anonymous</Checkbox>
                        </Form.Item>
                    </>
                );

            case 'photo_contest':
                return (
                    <>
                        <Form.Item
                            name="theme"
                            label="Theme/Title"
                            rules={[{ required: true, message: 'Please enter the theme or title' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="requirements"
                            label="Image Upload Requirements"
                            rules={[{ required: true, message: 'Please specify requirements' }]}
                        >
                            <Input placeholder="e.g. Max size, file type, etc." />
                        </Form.Item>

                        <Form.Item
                            name="deadline"
                            label="Submission Deadline"
                            rules={[{ required: true, message: 'Please select a deadline' }]}
                        >
                            <DatePicker showTime style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                            name="criteria"
                            label="Voting Criteria"
                            rules={[{ required: true, message: 'Please specify criteria' }]}
                        >
                            <Input placeholder="e.g. Likes, judges, etc." />
                        </Form.Item>

                        <Form.Item name="upload" label="Image Upload">
                            <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
                                <Button icon={<UploadOutlined />}>Select Image</Button>
                            </Upload>
                        </Form.Item>
                    </>
                );

            default:
                return null;
        }
    };

    const defaultInitialValues = {
        options: pollType === 'voting' ? [{ text: '' }] : [],
        fields: pollType === 'free_table' ? [{ label: '' }] : [],
        questions: pollType === 'survey' ? [{ question: '', type: '' }] : [],
        anonymous: false,
    };

    return (
        <Modal
            title={null}
            open={open && !!pollType}
            onCancel={onClose}
            footer={null}
            closeIcon={null}
        >
            {pollColor && (
                <div
                    style={{
                        height: 8,
                        width: '100%',
                        background: pollColor,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        margin: '-24px -24px 16px -24px',
                    }}
                />
            )}

            <Button
                type="text"
                icon={<CloseOutlined style={{ fontSize: 20 }} />}
                onClick={onClose}
                style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}
            />

            {pollType && (
                <>
                    <Typography.Title
                        level={4}
                        style={{ marginBottom: 24, marginTop: 0, textTransform: 'capitalize' }}
                    >
                        Create {pollType.replace('_', ' ')} Poll
                    </Typography.Title>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        onFinishFailed={handleFinishFailed}
                        initialValues={defaultInitialValues}
                    >
                        {renderPollFields()}
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    Create Poll
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </>
            )}
        </Modal>
    );
};

export default CreatePollForm;
