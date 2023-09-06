import React, { useState } from 'react';
import { useMediaQuery} from '@mui/material';
import {
  Drawer,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';

import { Brightness4, Brightness7, EmojiObjects, Settings } from '@mui/icons-material';

const ThemeChanger = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('light');
  const isSmallScreen = useMediaQuery('(max-width: 768px)'); // Adjust the max-width value as needed
  
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(open);
  };

  const handleThemeChange = (event, newTheme) => {
    if (newTheme !== null) {
      setSelectedTheme(newTheme);
      toggleDrawer(false)
      // You can implement theme switching logic here
    }
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)} style={{ color: "white" }}>
        <Settings style={{ fontSize: "40px" }} />
      </IconButton>
      <Drawer anchor={isSmallScreen?"top":"left"} open={openDrawer} onClose={toggleDrawer(false)} style={{ zIndex: "5" }}>
        <div style={{ zIndex: "5" ,display:"flex",justifyContent:"center"}}>
          <Box>
            <ToggleButtonGroup
              value={selectedTheme}
              exclusive
              onChange={handleThemeChange}
              orientation="vertical"
              aria-label="theme"
            >
              <ToggleButton value="light" style={{ background: "white" ,minWidth:isSmallScreen?"400px":"auto"}} onClick={()=>{props.callback('Light')}}>
                <Brightness7 /> Light
              </ToggleButton>
              <ToggleButton value="dark" style={{ background: "white" }} onClick={()=>{props.callback('Dark')}}>
                <Brightness4 /> Dark
              </ToggleButton>
              <ToggleButton value="alternate" style={{ background: "white" }} onClick={()=>{props.callback('Alternate')}}>
                <EmojiObjects /> Alternate
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </div>
      </Drawer>
    </div>
  );
};

export default ThemeChanger;
