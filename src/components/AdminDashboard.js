import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Collapse, Typography } from '@mui/material';
import { ExpandLess, ExpandMore, Home as HomeIcon, ListAlt as ListAltIcon, Person as PersonIcon, Edit as EditIcon, Logout as LogoutIcon } from '@mui/icons-material';

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');
  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    setActiveMenu(menu === activeMenu ? '' : menu);
    if (menu === 'modify') {
      setOpen(!open);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: '#000', // Set sidebar background color to black
            color: '#fff', // Set text color to white
          },
        }}
      >
        <Typography variant="h6" sx={{ padding: 2, color: '#fff' }}>
          HealthNav
        </Typography>
        <List>
          <ListItem button onClick={() => navigate('/adminhome')} sx={{ color: '#fff' }}>
            <ListItemIcon sx={{ color: '#fff' }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" sx={{ color: '#fff' }} />
          </ListItem>
          <ListItem button onClick={() => navigate('/home')} sx={{ color: '#fff' }}>
            <ListItemIcon sx={{ color: '#fff' }}>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Doctor List" sx={{ color: '#fff' }} />
          </ListItem>
          <ListItem button sx={{ color: '#fff' }}>
            <ListItemIcon sx={{ color: '#fff' }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="User List" sx={{ color: '#fff' }} />
          </ListItem>
          <ListItem button onClick={() => handleMenuClick('modify')} sx={{ color: '#fff' }}>
            <ListItemIcon sx={{ color: '#fff' }}>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Modify" sx={{ color: '#fff' }} />
            {activeMenu === 'modify' ? <ExpandLess sx={{ color: '#fff' }} /> : <ExpandMore sx={{ color: '#fff' }} />}
          </ListItem>
          <Collapse in={activeMenu === 'modify'} timeout="auto" unmountOnExit>
          <ListItem button onClick={() => navigate('/add')} sx={{ color: '#fff' }}>
              <ListItemIcon sx={{ color: '#fff' }}>
                
              </ListItemIcon>
              <ListItemText primary="Add Doctor" sx={{ color: '#fff', pl: 2 }} />
            </ListItem>
            <ListItem button onClick={() => navigate('/remove')} sx={{ color: '#fff' }}>
              <ListItemIcon sx={{ color: '#fff' }}>
                
              </ListItemIcon>
              <ListItemText primary="Remove Doctor" sx={{ color: '#fff', pl: 2 }} />
            </ListItem>
            <ListItem button onClick={() => navigate('/edit')} sx={{ color: '#fff' }}>
              <ListItemIcon sx={{ color: '#fff' }}>
                
              </ListItemIcon>
              <ListItemText primary="Edit Doctor" sx={{ color: '#fff', pl: 2 }} />
            </ListItem>
          </Collapse>
          <ListItem button onClick={() => navigate('/')} sx={{ color: '#fff' }}>
            <ListItemIcon sx={{ color: '#fff' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" sx={{ color: '#fff' }} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default AdminDashboard;
