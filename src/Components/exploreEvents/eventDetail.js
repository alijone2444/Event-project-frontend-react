import React from 'react';
import { Grid, Typography, Button, IconButton } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const EventDetail = () => {
  return (
    <Grid container spacing={2}>
      {/* Title */}
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Event Title
        </Typography>
      </Grid>

      {/* Subheader */}
      <Grid item xs={12}>
        <Typography variant="h6" fontWeight="lighter">
          Subheader
        </Typography>
      </Grid>

      {/* Description */}
      <Grid item xs={12}>
        <Typography variant="body1">
          This is the event description. Provide more details here.
        </Typography>
      </Grid>

      {/* Interested Button */}
      <Grid item xs={12}>
        <Button variant="contained" color="primary">
          Interested
          <IconButton color="inherit">
            <CheckCircleOutlineIcon />
          </IconButton>
        </Button>
      </Grid>
    </Grid>
  );
};

export default EventDetail;
