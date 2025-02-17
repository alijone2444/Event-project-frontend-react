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
import { setAdminSocietiesData } from '../../ReduxStore/actions/AdminSocietyAction';
import { useSelector } from "react-redux";
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { setSocietyAdminViewMoreOption } from '../../ReduxStore/actions/AdminSocietyAction';
import AssignSocietyForm from './assignSoicetyForm';
const SocietiesAdminComponent = (props) => {
    const dispatch = useDispatch();
    const requestInstance = createAuthenticatedRequest()
    const societies = useSelector((state) => state.Adminsocieties);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [runAfterUpdate, setrunAfterUpdate] = useState(false)
    const [rerun, setrerun] = useState(false)
    const [Previousvalues, setPreviousvalues] = useState(null)
    const hasMoreSocieties = useSelector((state) => state.adminViewmore);
    const [edit, setedit] = useState(false)
    const [AssignSociety, setAssignSociety] = useState(false)
    const [tempSocietyNameStorage, settempSocietyNameStorage] = useState('')
    const [updateData, setupdateData] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async (page, limit) => {
            try {
                setLoading(true)
                const response = await requestInstance.get(`${constants.BASE_URL}get-societies?page=${page}&limit=${limit}&amount=${'All'}`);
                // Assuming the response contains societies data
                if (response.data.societies) {
                    if (updateData) {
                        dispatch(setAdminSocietiesData(response.data.societies));
                    }
                    else {
                        dispatch(setAdminSocietiesData([...societies, ...response.data.societies]));
                    }
                    setLoading(false)
                    if (response.data.societies.length < limit) {
                        dispatch(setSocietyAdminViewMoreOption(false))
                        // No more societies to load
                    }
                }
                setupdateData(false)
                // Handle the societies data as needed
                // Return data or perform any other actions if needed
            } catch (error) {
                setupdateData(false)
                // Handle errors
                console.error('Error fetching societies data:', error);
                // You might want to handle errors here rather than throwing them
            }
        };
        if (societies.length === 0 || rerun) {
            fetchData(page, limit); // Call the async function
        }
    }, [runAfterUpdate]);

    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const handleEdit = (record) => {
        setedit(true)
        form.setFieldsValue(record);
        setPreviousvalues(record)
        setVisible(true);
    };
    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const response = await requestInstance.delete(`${constants.BASE_URL}delete-societies/${id}`);
            // Assuming response.data contains updated societies data after deletion 
            if (response.data.societies) {
                message.success('Society deleted successfully.');
                setLoading(false);
                if (response.data.success) {
                    const updatedSocieties = societies.filter((item) => item._id !== id);
                    dispatch(setAdminSocietiesData(updatedSocieties));
                }
            }
        } catch (error) {
            console.error('Error deleting society:', error);
            message.error('Failed to delete society.');
        } finally {
            setLoading(false);
        }
    };

    const handleViewMore = () => {
        setPage(page + 1);
        setrerun(true)
        setrunAfterUpdate(!runAfterUpdate)
    };


    const handleUpdate = async (values) => {
        setupdateData(true)
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

                            <Button type="primary" onClick={() => { setVisible(true); setedit(false) }}>Create Society
                                <PlusCircleOutlined style={{ color: 'white' }} />
                            </Button>
                        </Grid>
                    </Grid>
                    <div style={{ padding: '2%' }}>
                        <Grid container spacing={2}>{societies ? (
                            societies.map(society => (
                                <Grid key={society._id} item xs={12} sm={6} md={4} lg={4}>
                                    <Card
                                        style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                        cover={
                                            <div style={{ width: '100%', height: '25vh', overflow: 'hidden' }}>
                                                <img
                                                    alt="society"

                                                    src={`${constants.BASE_URL}societyImages/${society.coverPhotoName}`}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                        }
                                    >
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontWeight: 'bold', fontSize: 17 }}>{society.name}</div>
                                            <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{society.description}</p>
                                            {society.isAdmin && <Button type="link" style={{ color: 'green' }} onClick={() => { setAssignSociety(true); settempSocietyNameStorage(society.name) }}>Assign Society To</Button>}
                                            <Button type="link" onClick={() => navigate('society-page', { state: { ...society, Simple: false } })}>Visit</Button>
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
                                onCancel={() => { setVisible(false); setedit(false) }}
                                footer={null}
                            >
                                <SocietyForm onclose={handleUpdate} Previousvalues={edit ? Previousvalues : {}} />
                            </Modal>
                            <Modal
                                title="Assign society to a user"
                                visible={AssignSociety}
                                onCancel={() => { setAssignSociety(false); setedit(false) }}
                                footer={null}
                            >
                                <AssignSocietyForm SocietyName={tempSocietyNameStorage} closemodal={() => { setAssignSociety(false) }} />
                            </Modal>
                        </Grid>
                    </div>
                </div >
            }

            <Grid container >
                <Grid item xs={12} sm={12} >
                    <Button variant="contained" style={{ backgroundColor: !hasMoreSocieties ? 'lightgrey' : 'purple', color: "white", width: '100%' }} disabled={!hasMoreSocieties} onClick={handleViewMore}>View More</Button>
                </Grid>
            </Grid>
        </>
    );
};

export default SocietiesAdminComponent;
