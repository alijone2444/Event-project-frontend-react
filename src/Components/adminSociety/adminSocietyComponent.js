import React, { useState } from 'react';
import { Button, Modal, Form, Input, message, Row, Col, Card } from 'antd';
import { Grid, } from '@mui/material';
import Typography from '@mui/material/Typography';
import { PlusCircleOutlined } from '@ant-design/icons'
// import axios from 'axios'; // Commenting out axios
const SocietiesAdminComponent = () => {
    const [societies, setSocieties] = useState([
        { id: 1, name: 'Society 1', description: 'Description 1', imageUrl: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Society 2', description: 'Description 2', imageUrl: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Society 3', description: 'Description 3', imageUrl: 'https://via.placeholder.com/150' },
    ]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const handleEdit = (record) => {
        form.setFieldsValue(record);
        setVisible(true);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            // await axios.delete(`/api/societies/${id}`); // Commenting out axios request
            message.success('Society deleted successfully.');
            setSocieties(societies.filter(society => society.id !== id)); // Remove society from state directly
        } catch (error) {
            console.error('Error deleting society:', error);
            message.error('Failed to delete society.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (values) => {
        setLoading(true);
        try {
            // await axios.put(`/api/societies/${values.id}`, values); // Commenting out axios request
            message.success('Society updated successfully.');
            setVisible(false);
            // fetchData();
        } catch (error) {
            console.error('Error updating society:', error);
            message.error('Failed to update society.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Grid container alignItems="center" justifyContent="space-between" style={{ backgroundColor: 'dodgerblue', padding: '1%' }}>
                <Grid item>
                    <Typography variant="h6" style={{ color: 'white', padding: '5%' }}>
                        Societies
                    </Typography>
                </Grid>
                <Grid item >
                    <Button type="primary" onClick={() => setVisible(true)}>Add Society
                        <PlusCircleOutlined style={{ color: 'white' }} />
                    </Button>
                </Grid>
            </Grid>
            <div style={{ padding: '2%' }}>
                <Grid container spacing={2}>

                    {societies.map(society => (
                        <Grid key={society.id} item xs={12} sm={6} md={4} lg={4}>
                            <Card
                                style={{ marginBottom: '16px', display: 'flex', }}
                                cover={<img alt="society" src={society.imageUrl} style={{ height: '100%' }} />}
                            >
                                <div style={{ textAlign: 'center' }}>
                                    <h3>{society.name}</h3>
                                    <p>{society.description}</p>
                                    <Button type="link" onClick={() => handleEdit(society)}>Edit</Button>
                                    <Button type="link" danger onClick={() => handleDelete(society.id)}>Delete</Button>
                                </div>
                            </Card>
                        </Grid>
                    ))}
                    <Modal
                        title="Edit Society"
                        visible={visible}
                        onCancel={() => setVisible(false)}
                        footer={null}
                    >
                        <Form
                            form={form}
                            onFinish={handleUpdate}
                            layout="vertical"
                            initialValues={{
                                name: '',
                                description: '',
                            }}
                        >
                            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter society name' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter society description' }]}>
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading}>Update</Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Grid>
            </div>
        </>
    );
};

export default SocietiesAdminComponent;
