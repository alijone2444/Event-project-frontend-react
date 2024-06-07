import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, message, Row, Col, Card } from 'antd';
import { Grid, } from '@mui/material';
import Typography from '@mui/material/Typography';
import { PlusCircleOutlined } from '@ant-design/icons'
// import axios from 'axios'; // Commenting out axios
import SocietyForm from './societyFormFields';
import constants from '../../Constants/constants';
import createAuthenticatedRequest from '../../RequestwithHeader';
import { useDispatch } from 'react-redux';
import { setSocietiesData } from '../../ReduxStore/actions/societyDataAction';
import { useSelector } from "react-redux";
import { Spin } from 'antd';
const SocietiesAdminComponent = () => {
    const dispatch = useDispatch();
    const requestInstance = createAuthenticatedRequest()
    const societies = useSelector((state) => state.Societies);
    const [runAfterUpdate, setrunAfterUpdate] = useState(false)
    const [rerun, setrerun] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await requestInstance.get(`${constants.BASE_URL}get-societies`);
                // Assuming the response contains societies data
                console.log(response, 'fanoiwio')
                dispatch(setSocietiesData(response.data.societies));
                setLoading(false)
                // Handle the societies data as needed
                // Return data or perform any other actions if needed
            } catch (error) {
                // Handle errors
                console.error('Error fetching societies data:', error);
                // You might want to handle errors here rather than throwing them
            }
        };
        if (societies.length === 0 || rerun) {
            fetchData(); // Call the async function
        }
    }, [runAfterUpdate]);

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
            const response = await requestInstance.delete(`${constants.BASE_URL}delete-societies/${id}`);
            // Assuming response.data contains updated societies data after deletion 
            dispatch(setSocietiesData(response.data.societies));
            message.success('Society deleted successfully.');
            setLoading(false);
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
            setrerun(true)
            setrunAfterUpdate(!runAfterUpdate)
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
            {loading ?
                <Spin size='large' style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
                :
                <div>
                    <Grid container alignItems="center" justifyContent="space-between" style={{ backgroundColor: 'dodgerblue', padding: '1%' }}>
                        <Grid item>
                            <Typography variant="h6" style={{ color: 'white' }}>
                                Societies
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Button type="primary" onClick={() => setVisible(true)}>Create Society
                                <PlusCircleOutlined style={{ color: 'white' }} />
                            </Button>
                        </Grid>
                    </Grid>
                    <div style={{ padding: '2%' }}>
                        <Grid container spacing={2}>{societies ? (
                            societies.map(society => (
                                <Grid key={society._id} item xs={12} sm={6} md={4} lg={4}>
                                    <Card
                                        style={{ marginBottom: '16px', display: 'flex' }}
                                        cover={<img alt="society" src={society.cover_photo} style={{ height: '25vh', width: '100%', objectFit: 'cover' }} />}
                                    >
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontWeight: 'bold', fontSize: 17 }}>{society.name}</div>
                                            <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{society.description}</p>
                                            <Button type="link" onClick={() => handleEdit(society)}>Edit</Button>
                                            <Button type="link" danger onClick={() => handleDelete(society._id)}>Delete</Button>
                                        </div>
                                    </Card>

                                </Grid>
                            ))
                        ) : (
                            <Spin />
                        )}
                            <Modal
                                title="Edit Society"
                                visible={visible}
                                onCancel={() => setVisible(false)}
                                footer={null}
                            >
                                <SocietyForm onclose={handleUpdate} />
                            </Modal>
                        </Grid>
                    </div>
                </div>
            }
        </>
    );
};

export default SocietiesAdminComponent;
