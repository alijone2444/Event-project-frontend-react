import React from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import { InboxOutlined } from '@ant-design/icons';

const NoDataComponent = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      textAlign="center"
      padding="5%"
    >
      <InboxOutlined style={{ fontSize: '44px', color: 'lightgrey', }} />
      <Typography variant="body1" color="lightgrey" fontWeight="light" style={{ marginTop: '8px' }}>
        There is no data to display at the moment.
      </Typography>
    </Box>
  );
};

export default NoDataComponent;
