import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { makeStyles } from '@mui/styles';
import { IconButton, useMediaQuery } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import { useSelector, useDispatch } from 'react-redux';
import constants from '../../Constants/constants';
import createAuthenticatedRequest from '../../RequestwithHeader';
import { setEventsDataAll } from '../../ReduxStore/actions/eventsDataActionUser';
import { CircularProgress } from '@mui/material';
const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: '5px',
        width: '100%',
        marginTop: '5%',
    },
    button: {
        color: 'white',
    },
    icon: {
        color: 'white',
    },
    textButton: {
        backgroundColor: 'transparent',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        border: 0,
        '&:hover': {
            color: 'lightgrey !important', // Text color on hover
        },
    },
    text: {
        marginLeft: '8px',
    },
}));

const LikeCommentShare = (props) => {
    const classes = useStyles();
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const events = useSelector((state) => state.userAllEvents); // Adjust according to your state structure
    const dispatch = useDispatch()
    const requestInstance = createAuthenticatedRequest()
    const [loading, setloading] = useState(false)
    const toggleLike = async (eventId, isLIKE) => {
        console.log(eventId, isLIKE)
        setloading(true)
        try {
            const response = await requestInstance.post(`${constants.BASE_URL}like-event`, { eventId, isLIKE });
            if (response.data) {
                const result = response.data;
                // Update the specific event in the Redux state
                const updatedEvents = events.map((event) =>
                    event._id === eventId ? { ...event, isLiked: result.events.isLiked, NoOfLikes: result.events.NoOfLikes } : event
                );
                dispatch(setEventsDataAll(updatedEvents));
                setloading(false)
                console.log(events)
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setloading(false)
        }
    };
    return (
        <div className={classes.row}>
            {isSmallScreen ? (
                <>
                    <IconButton className={classes.button} onClick={() => toggleLike(props.id, props.isLiked)} >
                        {loading ? <CircularProgress style={{ color: 'white' }} size={15} /> : <ThumbUpIcon className={classes.icon} style={{ color: props.isLiked ? 'dodgerblue' : 'white' }}
                        />}
                    </IconButton>
                    <IconButton className={classes.button} onClick={() => props.commentsCalled()}>
                        <CommentIcon className={classes.icon} />
                    </IconButton>
                    <IconButton className={classes.button} onClick={() => props.showshare()}>
                        <ShareIcon className={classes.icon} />
                    </IconButton>
                </>
            ) : (
                <>
                    <Button className={classes.textButton} icon={loading ? <CircularProgress style={{ color: 'white' }} size={15} /> : <ThumbUpIcon className={classes.icon} style={{ color: props?.isLiked ? 'dodgerblue' : 'white' }} />}
                        onClick={() => toggleLike(props.id, props.isLiked)} >
                        <span className={classes.text}>Like</span>
                    </Button>
                    <Button className={classes.textButton} icon={<CommentIcon className={classes.icon} />} onClick={() => props.commentsCalled()}>
                        <span className={classes.text}>Comment</span>
                    </Button>
                    <Button className={classes.textButton} icon={<ShareIcon className={classes.icon} onClick={() => props.showshare()} />}>
                        <span className={classes.text}>Share</span>
                    </Button>
                </>
            )}
        </div>
    );
};

export default LikeCommentShare;
