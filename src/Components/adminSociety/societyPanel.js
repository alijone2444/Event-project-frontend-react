import React, { useEffect, useState } from "react";
import { Grid, Card, Button, Typography, Skeleton } from "@mui/material";
import WrapperComponent from "../../FooterAndHeaderwrapper";
import constants from "../../Constants/constants";
import createAuthenticatedRequest from "../../RequestwithHeader";
import { useLocation } from "react-router-dom";
import AssignRoleModal from "../SearchModal/appointAdminsModal";

const SocietyPanel = () => {
    const location = useLocation();
    const { role } = location.state || {}; // Destructure role from state  
    const [societies, setSocieties] = useState([]);
    const [loading, setLoading] = useState(true);  // Track loading state
    const [ShowModal, setShowModal] = useState(false)
    const [selectedRole, setSelectedRole] = useState('')
    const [selectedSociety, setSelectedSociety] = useState('')
    const requestInstance = createAuthenticatedRequest()

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
                                <Card sx={{ padding: 2 }}>
                                    <Typography variant="h6">{society.name}</Typography>
                                    <Typography variant="subtitle1">{role}</Typography>
                                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                                        Members:
                                    </Typography>
                                    <ul>
                                        {society.members.map((member) => (
                                            <li key={member.name}>
                                                {member.role}: {member.name}
                                            </li>
                                        ))}
                                    </ul>
                                    {renderActions(society)}
                                </Card>
                            </Grid>
                        ))}
                        <AssignRoleModal open={ShowModal} closeModal={() => setShowModal(false)} role={selectedRole} SocietyName={selectedSociety} />
                    </Grid>
                ) : (
                    <Typography variant="body1">No societies assigned.</Typography>
                )}
            </div>
        </WrapperComponent>
    );
};

export default SocietyPanel;
