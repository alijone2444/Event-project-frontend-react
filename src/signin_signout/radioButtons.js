import React, { useState } from 'react';
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

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(open);
  };

  const handleThemeChange = (event, newTheme) => {
    if (newTheme !== null) {
      setSelectedTheme(newTheme);
      // You can implement theme switching logic here
    }
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)} style={{ color: "white" }}>
        <Settings style={{ fontSize: "40px" }} />
      </IconButton>
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)} style={{ zIndex: "1" }}>
        <div style={{ zIndex: "5" }}>
          <Box>
            <ToggleButtonGroup
              value={selectedTheme}
              exclusive
              onChange={handleThemeChange}
              orientation="vertical"
              aria-label="theme"
            >
              <ToggleButton value="light" style={{ background: "white" }} onClick={()=>{props.callback('Light')}}>
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
