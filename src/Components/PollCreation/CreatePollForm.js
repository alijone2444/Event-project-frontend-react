import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Space, Typography, DatePicker, Checkbox, Upload, Select } from 'antd';
import { PlusOutlined, MinusCircleOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const CreatePollForm = ({ open, onClose, pollType, eventId, pollColor }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            form.resetFields();
            if (pollType === 'voting') {
                form.setFieldsValue({ options: [{ text: '' }] });
            }
            if (pollType === 'free_table') {
                form.setFieldsValue({ fields: [{ label: '' }] });
            }
        }
    }, [open, pollType, form]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            console.log('Creating poll:', { ...values, eventId, pollType });
            onClose();
        } catch (error) {
            console.error('Error creating poll:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderPollFields = () => {
        if (!pollType) return null;
        switch (pollType) {
            case 'voting':
                return (
                    <>
                        <Form.Item name="title" label="Title of the Vote" rules={[{ required: true, message: 'Please enter the title' }]}>
                            <Input />
                        </Form.Item>
                        <Form.List name="options" rules={[{ required: true, message: 'Please add at least one candidate/option' }]}>
                            {(fields, { add, remove }) => (
                                <div>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item {...restField} name={[name, 'text']} rules={[{ required: true, message: 'Missing option' }]}>
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
                                </div>
                            )}
                        </Form.List>
                        <Form.Item name="deadline" label="Voting Deadline" rules={[{ required: true, message: 'Please select a deadline' }]}>
                            <DatePicker showTime style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="eligibility" label="Participant Eligibility" rules={[{ required: true, message: 'Please specify eligibility' }]}>
                            <Input placeholder="e.g. All students, Only members, etc." />
                        </Form.Item>
                    </>
                );

            case 'free_table':
                return (
                    <>
                        <Form.Item name="topic" label="Open-ended Question or Topic" rules={[{ required: true, message: 'Please enter a topic/question' }]}>
                            <Input />
                        </Form.Item>
                        <Form.List
                            name="fields"
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
                                <div>
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
                                </div>
                            )}
                        </Form.List>
                    </>
                );

            case 'collect_ideas':
                return (
                    <>
                        <Form.Item name="problem" label="Problem Statement / Topic Area" rules={[{ required: true, message: 'Please enter a problem statement or topic' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="format" label="Idea Submission Format" rules={[{ required: true, message: 'Please specify the format' }]}>
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
                        <Form.Item name="goal" label="Survey Goal/Description" rules={[{ required: true, message: 'Please enter the survey goal or description' }]}>
                            <TextArea rows={2} />
                        </Form.Item>
                        <Form.List name="questions" rules={[{ required: true, message: 'Please add at least one question' }]}>
                            {(fields, { add, remove }) => (
                                <div>
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
                                </div>
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
                        <Form.Item name="theme" label="Theme/Title" rules={[{ required: true, message: 'Please enter the theme or title' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="requirements" label="Image Upload Requirements" rules={[{ required: true, message: 'Please specify requirements' }]}>
                            <Input placeholder="e.g. Max size, file type, etc." />
                        </Form.Item>
                        <Form.Item name="deadline" label="Submission Deadline" rules={[{ required: true, message: 'Please select a deadline' }]}>
                            <DatePicker showTime style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="criteria" label="Voting Criteria" rules={[{ required: true, message: 'Please specify criteria' }]}>
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
                    <Typography.Title level={4} style={{ marginBottom: 24, marginTop: 0, textTransform: 'capitalize' }}>
                        Create {pollType.replace('_', ' ')} Poll
                    </Typography.Title>
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
