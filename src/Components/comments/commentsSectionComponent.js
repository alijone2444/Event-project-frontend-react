import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography, TextField, Button, Divider, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment'; // Import moment.js for date formatting
import SendIcon from '@mui/icons-material/Send';
import Lottie from 'react-lottie';
import animationData from '../../lottie/flyingPlane.json';
import { db } from '../Firebase/firebase';
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy, limit, where } from "firebase/firestore";
import createAuthenticatedRequest from '../../RequestwithHeader';
import constants from '../../Constants/constants';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useMediaQuery } from '@mui/material';

const CommentSection = ({ eventName }) => {
    const classes = useStyles();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showLottie, setshowLottie] = useState(false);
    const [username, setUserName] = useState(null);
    const [profileImage, setProfileImage] = useState('');
    const isSmallScreen = useMediaQuery('(max-width:600px)')
    const commentsEndRef = useRef(null); // Ref for end of comments
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Replace with your authentication request instance
                const requestInstance = createAuthenticatedRequest();
                const response = await requestInstance.get(`${constants.BASE_URL}get-username-profileimg`);
                if (response.data) {
                    setUserName(response.data.username);
                    setProfileImage(response.data.profileImageUrl);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                // Create a Firestore query to fetch comments for the specific eventName
                const q = query(
                    collection(db, "Events-Messaging"),
                    where("eventName", "==", eventName),
                    orderBy("createdAt", "desc"),
                    limit(25)
                );
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const fetchedComments = [];
                    querySnapshot.forEach((doc) => {
                        fetchedComments.push({ id: doc.id, ...doc.data() });
                    });
                    setComments(fetchedComments);
                });
                return unsubscribe;
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        if (eventName) {
            fetchComments();
        }
    }, [eventName]);

    const scrollToBottom = () => {
        if (commentsEndRef.current) {
            commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    const handleCommentSubmit = async () => {
        try {
            setshowLottie(true);
            await addDoc(collection(db, "Events-Messaging"), {
                text: newComment,
                name: username,
                avatar: profileImage,
                eventName: eventName,
                createdAt: serverTimestamp(),
            });
            setNewComment(""); // Clear input field
            setshowLottie(false);
        } catch (error) {
            console.error('Error adding comment:', error);
            setshowLottie(false);
        }
    };

    return (
        <Grid container className={classes.commentContainer}>
            <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                <Typography variant="h6" gutterBottom style={{ color: 'white', }}>
                    Comments
                </Typography>
                <Button onClick={scrollToBottom} style={{ color: 'white', fontSize: 10 }}>
                    Move to Bottom <KeyboardArrowDownIcon />
                </Button>
            </Grid>

            <Divider style={{ backgroundColor: 'white', width: '100%' }} />
            <Grid item xs={12} md={6} style={{ maxHeight: !isSmallScreen && '60vh', overflowY: !isSmallScreen && 'auto', borderRight: !isSmallScreen && '1px solid white', marginBottom: isSmallScreen && '5%' }}>

                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <Grid item xs={12} className={classes.comment} style={{
                            backgroundColor: index % 2 == 0 ? 'rgba(0,0,0,0.5)' : 'transparent', border: '1px solid white',
                            borderColor: index % 2 == 0 ? 'transparent' : 'lightgrey', borderRadius: !isSmallScreen ? "0" : '2%'
                        }}>
                            <Avatar alt={comment.name} src={comment.avatar} className={classes.avatar} />
                            <div className={classes.commentContent}>
                                <div className={classes.commentHeader}>
                                    <Typography variant="body1" >
                                        <strong>{comment.name}</strong>
                                    </Typography>
                                    <Typography variant="body2" className={classes.commentTime}>
                                        {comment.createdAt ? new Date(comment.createdAt.seconds * 1000).toLocaleDateString("en-US") : ''}
                                    </Typography>

                                </div>
                                <Typography variant="body2" className={classes.commentText}>
                                    {comment.text}
                                </Typography>
                            </div>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body2" style={{ color: 'white', marginTop: '10px' }}>
                        No comments available.
                    </Typography>
                )}
                {/* Comment Form */}
            </Grid>
            <Grid item xs={12} md={6} className={classes.commentForm}
                ref={commentsEndRef}
                style={{
                    padding: isSmallScreen ? '2%' : '5%',
                }}>
                <Typography variant='h6' style={{ marginBottom: '5%' }}>
                    Leave a Comment
                </Typography>
                <TextField
                    label="Write a comment"
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    InputProps={{
                        style: { color: 'white' },
                        placeholder: 'Enter your comment here',
                        classes: {
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        },
                    }}
                    className={classes.textField}
                />
                {!showLottie && (
                    <div style={{ textAlign: "center", width: '100%' }}>
                        <Button
                            variant="contained"
                            onClick={handleCommentSubmit}
                            style={{ marginTop: '1rem', backgroundColor: 'white', color: 'Dodgerblue' }}
                            endIcon={<SendIcon />}
                        >
                            Post Comment
                        </Button>
                    </div>
                )}
                {showLottie && (
                    <div style={{ marginTop: '3%' }}>
                        <Lottie
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: animationData,
                            }}
                            height={100}
                            width={100}
                        />
                    </div>
                )}
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    commentContainer: {
        marginTop: '5%',
        color: 'white'
    },
    comment: {
        display: 'flex',
        flexDirection: 'row',
        color: 'white',
        padding: '3%',
        borderRadius: '2%'
    },
    avatar: {
        marginRight: '2%'
    },
    commentForm: {
        color: 'white'
    },
    textField: {
        width: '100%',
        marginBottom: '3%',
        marginTop: '3%',
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'dodgerblue',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'lightgrey',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
        },
        '& .MuiInputBase-input': {
            color: 'white',
        },
        '& .MuiInputLabel-root': {
            color: 'white',
        },
        '& .MuiFormHelperText-root': {
            color: 'white',
        },
    },
    commentTime: {
        marginTop: '3%',
        color: 'lightgrey',
    },
}));

export default CommentSection;
