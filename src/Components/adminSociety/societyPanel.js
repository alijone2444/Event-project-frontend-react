import React, { useEffect, useState } from "react";
import { Grid, Card, Button, Typography, Skeleton, Box } from "@mui/material";
import WrapperComponent from "../../FooterAndHeaderwrapper";
import { Button as AntdButton } from 'antd';
import { useNavigate } from "react-router-dom";
import SocietyForm from "./societyFormFields";
import { EditOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Modal } from "antd";
import { Modal as materialModal } from '@mui/material'
import constants from "../../Constants/constants";
import createAuthenticatedRequest from "../../RequestwithHeader";
import { useLocation } from "react-router-dom";
import AssignRoleModal from "../SearchModal/appointAdminsModal";
import CreateEvent from "../EventCreation/eventcreationComponent";

const SocietyPanel = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const { role } = location.state || {}; // Destructure role from state  
    const [societies, setSocieties] = useState([]);
    const [loading, setLoading] = useState(true);  // Track loading state
    const [ShowModal, setShowModal] = useState(false)
    const [selectedRole, setSelectedRole] = useState('')
    const [showSocietyEditModal, setshowSocietyEditModal] = useState('')
    const requestInstance = createAuthenticatedRequest()
    const [Previousvalues, setPreviousvalues] = useState({})
    const [selectedSociety, setSelectedSociety] = useState('')
    const [showEventModal, setshowEventModal] = useState(false)


    useEffect(() => {
        console.log('role is ', role)
        // Fetch societies based on user role and token
        const fetchSocieties = async () => {
            try {
                const response = await requestInstance.post(
                    `${constants.BASE_URL}fetch-society-based-on-role`,
                    { role: role },
                );

                setSocieties(response.data.societies);
                setLoading(false);  // Set loading to false once data is fetched
            } catch (error) {
                setLoading(false);
                console.error("Failed to fetch societies", error);
            }
        };

        fetchSocieties();
    }, [role]);

    const appointMember = (societyId, role, societyName) => {
        // Handle appointing members
        setSelectedSociety(societyName)
        setShowModal(true)
        setSelectedRole(role)
    };
    const handleShowEvent = (id, societyName) => {
        setshowEventModal(true)
        setSelectedSociety(societyName)
    }

    const renderActions = (society) => {
        if (role === "President") {
            return (
                <>
                    <Button
                        style={{ margin: '1%' }}
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => appointMember(society.id, "Vice President", society.name)}
                    >
                        Appoint Vice President
                    </Button>
                    <Button
                        style={{ margin: '1%' }}
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={() => appointMember(society.id, "Liaison", society.name)}
                    >
                        Appoint Liaison
                    </Button>
                    <Button
                        style={{ margin: '1%' }}
                        size="small"
                        variant="contained"
                        onClick={() => appointMember(society.id, "Secretary", society.name)}
                    >
                        Appoint Secretary
                    </Button>
                </>
            );
        } else if (role === "Vice President") {
            return (
                <>
                    <Button
                        style={{ margin: '1%' }}
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => appointMember(society.id, "Liaison", society.name)}
                    >
                        Appoint Liaison
                    </Button>
                    <Button
                        style={{ margin: '1%' }}
                        size="small"
                        variant="contained"
                        onClick={() => appointMember(society.id, "Secretary", society.name)}
                    >
                        Appoint Secretary
                    </Button>
                </>
            );
        } else if (role === "Liaison" || role === "Secretary") {
            return <Typography variant="body2">You can view society details.</Typography>;
        }
        return null;
    };

    return (
        <WrapperComponent>
            <div style={{ padding: '5%' }}>

                {loading ? (
                    <Grid container spacing={4}>
                        {[1, 2, 3, 4].map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item}>
                                <Skeleton variant="rectangular" width="100%" height={200} />
                                <Skeleton variant="text" width="80%" height={30} />
                                <Skeleton variant="text" width="60%" height={30} />
                            </Grid>
                        ))}
                    </Grid>
                ) : societies.length > 0 ? (
                    <Grid container spacing={4}>
                        {societies.map((society) => (
                            <Grid item xs={12} sm={6} md={4} key={society.id}>
                                <Card sx={{ padding: 2 }}
                                >

                                    <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'dodgerblue', alignItems: 'center', justifyContent: 'space-between', borderRadius: '2%' }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                            <img src={`${constants.BASE_URL}societyImages/${society.coverPhotoName}`}
                                                alt="No image"
                                                style={{ width: '20%', height: '20%', borderRadius: '50%' }} />

                                            <Typography variant="h6" style={{ color: 'white' }}>{society.name}</Typography>
                                        </div>
                                        <AntdButton
                                            type="primary"
                                            style={{ background: 'transparent' }}
                                            icon={<EditOutlined />}
                                            size={'medium'}
                                            onClick={() => { setshowSocietyEditModal(true); setPreviousvalues(society) }}
                                        />
                                        <AntdButton
                                            type="primary"
                                            style={{ background: 'transparent' }}
                                            icon={<EyeOutlined />}
                                            size={'medium'}
                                            onClick={() => navigate('society-page', { state: { ...society, Simple: false, comeBackTo: "/sub-admin-panel" } })}
                                        />
                                    </div>
                                    <Typography variant="subtitle1">{role}</Typography>
                                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                                        Members:
                                    </Typography>
                                    <ul style={{ maxHeight: '50px', overflowY: 'auto' }}>
                                        {society.members
                                            .filter(member =>
                                                typeof member === 'object' && // Ensure the element is an object
                                                member !== null &&           // Exclude `null` values
                                                member.role !== 'Member'    // Exclude objects where `role` is "student"
                                            )
                                            .map((member) => (
                                                <li key={member.name}>
                                                    {member.role}: {member.name}
                                                </li>
                                            ))}
                                    </ul>
                                    {renderActions(society)}

                                    <Button
                                        style={{ margin: '1%' }}
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleShowEvent(society.id, society.name)}
                                    >
                                        Create Event
                                    </Button>
                                </Card>
                            </Grid>
                        ))}
                        <AssignRoleModal open={ShowModal} closeModal={() => setShowModal(false)} role={selectedRole} SocietyName={selectedSociety} />
                        <Modal
                            title="Edit Society"
                            visible={showSocietyEditModal}
                            onCancel={() => { setshowSocietyEditModal(false); }}
                            footer={null}
                        >
                            <SocietyForm onclose={() => setshowSocietyEditModal(false)} Previousvalues={true ? Previousvalues : {}} />
                        </Modal>
                        {showEventModal && <materialModal
                            open={showEventModal}
                            onClose={() => { setshowEventModal(false) }}
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '80vw', // Adjust the width as needed
                                    maxWidth: '600px', // Example of max width
                                    bgcolor: 'background.paper',
                                    boxShadow: 24,
                                    p: 4,
                                    overflowY: 'auto', // Make the modal scrollable
                                    maxHeight: '80vh', // Limit the max height if needed
                                }}
                            >
                                <CreateEvent
                                    oncloseSimple={() => { setshowEventModal(false) }}
                                    onclose={() => { setshowEventModal(false) }}
                                    edit={null}
                                    societyName={selectedSociety}
                                />
                            </Box>
                        </materialModal>}
                    </Grid>
                ) : (
                    <Typography variant="body1">No societies assigned.</Typography>
                )}
            </div>
        </WrapperComponent >
    );
};

export default SocietyPanel;
