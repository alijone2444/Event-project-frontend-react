import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import makeStyles from '@mui/styles/makeStyles';
import createAuthenticatedRequest from '../../RequestwithHeader';
import constants from '../../Constants/constants';
import CircularProgress from '@mui/material/CircularProgress';
import IcogramsMap from '../MapComponent.js/icongramMap';

const CreateEvent = (props) => {

  const requestInstance = createAuthenticatedRequest()
  const classes = useStyles();
  const [imageUrl, setimageUrl] = useState(false)
  const [image, setimage] = useState(null)
  const [showLoader, setshowLoader] = useState(false)
const [isOutsideIST, setIsOutsideIST] = useState("inside");
  const [eventData, setEventData] = useState({
    eventName: '',
    subheader: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    organizer: '',
    maxAttendees: 0,
    registrationOpen: true,
    registrationDeadline: '',
    tags: [],
    imageFiles: [],
  });

  useEffect(() => {
    if (props.edit) {
      setEventData({
        eventName: props.edit.eventName || '',
        subheader: props.edit.subheader || '',
        description: props.edit.description || '',
        location: props.edit.location || '',
        startDate: props.edit.startDate ? new Date(props.edit.startDate).toISOString().split('T')[0] : '',
        endDate: props.edit.endDate ? new Date(props.edit.endDate).toISOString().split('T')[0] : '',
        startTime: '',
        endTime: '',
        organizer: props.edit.organizer || '',
        maxAttendees: props.edit.maxAttendees || 0,
        registrationOpen: props.edit.registrationOpen || true,
        registrationDeadline: props.edit.registrationDeadline ? new Date(props.edit.registrationDeadline).toISOString().split('T')[0] : '',
        tags: props.edit.tags || [],
        imageFiles: (props.edit.imageFileNames || []).map(event => ({
          src: `${constants.BASE_URL}images/${event}`,
          // src={`${constants.BASE_URL}images/${event.dpimageFileName}`}
        })),
      });
      setimageUrl(`${constants.BASE_URL}images/${props.edit.dpimageFileName}`);
    }
  }, [props]);

  const handleChange = (field, value) => {
    setEventData({
      ...eventData,
      [field]: value,
    });
  };

  const handleSave = async (event) => {
    event.preventDefault();

    // Create a FormData object to send files
    const formData = new FormData();

    const DpfileName = `${eventData.eventName}_${eventData.organizer}_'Dp'`;
    formData.append('Dpimage', image, DpfileName)
    // Generate unique filenames for images and store in FormData
    eventData.imageFiles.forEach((file, index) => {
      const fileName = `${eventData.eventName}_${eventData.organizer}_${index}`;
      formData.append('imageFiles', file, fileName);
    });

    // Store image filenames in the database or use them as references
    const imageFileNames = eventData.imageFiles.map((file, index) => {
      return `${eventData.eventName}_${eventData.organizer}_${index}`;
    });

    formData.append('societyName', props.societyName ? props.societyName : 'None')
    // Append other form data to FormData
    Object.entries(eventData).forEach(([key, value]) => {
      if (key !== 'imageFiles' && key !== 'Dpimage') {
        formData.append(key, value);
      }
    });

    // Append image filenames to FormData
    formData.append('imageFileNames', JSON.stringify(imageFileNames));

    try {
      setshowLoader(true)
      const response = await requestInstance.post(`${constants.BASE_URL}save-events`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for FormData
        },
      });

      if (response.data.success === true) {
        setshowLoader(false)
        props.onclose()
      }
    } catch (error) {
      setshowLoader(false)
      console.error('Error uploading images:', error);
    }
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setimageUrl(reader.result)
      setimage(file)
    };
    if (file) {
      reader.readAsDataURL(file);
    }


  };
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setEventData((prevData) => ({
      ...prevData,
      imageFiles: [...prevData.imageFiles, ...files],
    }));
  };
  return (
    <div>
      <form onSubmit={handleSave}>
        <AppBar position="sticky" style={{ zIndex: '2' }}>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton edge="start" color="inherit" aria-label="close" onClick={props.oncloseSimple}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">Create Event</Typography>
            {showLoader ? <CircularProgress style={{ color: 'white' }} />
              :
              <Button color="inherit" type='submit' startIcon={<SaveIcon />} >
                Save
              </Button>}
          </Toolbar>
        </AppBar>
        <FormGroup style={{ padding: '5%' }}>
          <TextField
            className={classes.data_fields}
            label="Event Name"
            required
            value={eventData.eventName}
            onChange={(e) => handleChange('eventName', e.target.value)}
            helperText="Enter the name of the event"
          />
          <TextField
            className={classes.data_fields}
            label="sub header for event"
            required
            value={eventData.subheader}
            onChange={(e) => handleChange('subheader', e.target.value)}
            helperText="Enter the sub heading of the event"
          />
          <TextField
            className={classes.data_fields}
            label="Description"
            required
            value={eventData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            helperText="Enter a description for the event"
          />
          {/* <TextField
            className={classes.data_fields}
            label="Location"
            required
            value={eventData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            helperText="Enter the location of the event"
          />
           */}
<TextField
      className={classes.data_fields}
      select
      label="Is the location inside IST?"
      value={isOutsideIST}
      onChange={(e) => setIsOutsideIST(e.target.value)}
      helperText="Select if the event is inside or outside IST"
      required
    >
      <MenuItem value="inside">Inside IST</MenuItem>
      <MenuItem value="outside">Outside IST</MenuItem>
    </TextField>

    {/* Show location field only if 'Outside IST' is selected */}
    {isOutsideIST === "outside" ? (
      <TextField
        className={classes.data_fields}
        label="Location"
        required
        value={eventData.location}
        onChange={(e) => handleChange("location", e.target.value)}
        helperText="Enter the location of the event"
      />
    ):
    <div style={{overflow:'auto',width:'100%',marginBottom:'5%'}}>
      <IcogramsMap 
    getlocation={(text) => {
      const locationText = text !== "DHA" ? `Institute of Space and Technology, ${text}` : text;
      handleChange("location", locationText);
    }} 
  />
  
    </div>
    }
          <TextField
            className={classes.data_fields}
            label="Start Time"
            type="time"
            required
            value={eventData.startTime}
            onChange={(e) => handleChange('startTime', e.target.value)}
            helperText="Enter the start time of the event"
          />
          <TextField
            className={classes.data_fields}
            label="End Time"
            type="time"
            required
            value={eventData.endTime}
            onChange={(e) => handleChange('endTime', e.target.value)}
            helperText="Enter the end time of the event"
          />
          <TextField
            className={classes.data_fields}
            label="Start Date"
            type="date"
            required
            value={eventData.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
            helperText="Enter the date at which the event starts"
          />
          <TextField
            className={classes.data_fields}
            label="End Date"
            type="date"
            required
            value={eventData.endDate}
            onChange={(e) => handleChange('endDate', e.target.value)}
            helperText="Enter the date at which the event ends"
          />
          <TextField
            className={classes.data_fields}
            label="Organizer"
            required
            value={eventData.organizer}
            onChange={(e) => handleChange('organizer', e.target.value)}
            helperText="Enter the organizer's name"
          />
          <TextField
            className={classes.data_fields}
            label="Max Attendees"
            type="number"
            required
            value={eventData.maxAttendees}
            onChange={(e) => handleChange('maxAttendees', parseInt(e.target.value, 10))}
            helperText="Enter the maximum number of attendees"
          />
          <FormControlLabel
            className={classes.data_fields}
            control={
              <Checkbox
                checked={eventData.registrationOpen}
                onChange={(e) => handleChange('registrationOpen', e.target.checked)}
              />
            }
            label="Registration Open"
          />
          <TextField
            className={classes.data_fields}
            label="Registration Deadline"
            type="date"
            required
            value={eventData.registrationDeadline}
            onChange={(e) => handleChange('registrationDeadline', e.target.value)}
            helperText="Enter the deadline for event registration"
          />
          <TextField
            className={classes.data_fields}
            label="Tags"
            required
            value={eventData.tags.join(',')}
            onChange={(e) => handleChange('tags', e.target.value.split(','))}
            helperText="Enter tags separated by commas"
          />
          <div style={{ border: '1px solid lightgrey', padding: '2%', marginBottom: '5%', zIndex: 1 }}>
            <Typography variant="body2" color="textSecondary">
              select the main picture that should be displayed on the front
            </Typography>
            <input
              type="file"
              accept="image/*"
              name="Dpimage"
              onChange={handleImageChange}
            />

            {imageUrl && (
              <img
                src={imageUrl}
                alt="Selected Event Image"
                style={{ maxWidth: '100%', marginTop: '10px' }}
              />
            )}
          </div>
          <div style={{ border: '1px solid lightgrey', padding: '2%', zIndex: 1 }}>
            <Typography variant="body2" color="textSecondary">
              Select more images related to event that should also be shown
            </Typography>
            <input
              type="file"
              accept="image/*"
              multiple
              name="imageFiles"
              onChange={handleImagesChange}
            />

            {eventData.imageFiles.map((file, index) => (
              <img
                key={index}
                src={file.src || URL.createObjectURL(file)}
                alt={`Selected Event Image ${index + 1}`}
                style={{ maxWidth: '100%', marginTop: '10px' }}
              />
            ))}
          </div>

        </FormGroup>
      </form>
    </div>
  );
};

const useStyles = makeStyles({
  data_fields: {
    marginBottom: '3%'
  },
});
export default CreateEvent;
