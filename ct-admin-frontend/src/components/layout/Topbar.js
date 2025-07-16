import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box, IconButton, Avatar,
  Dialog, DialogTitle, DialogContent, DialogActions, Button
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

function Topbar() {
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogoutConfirm = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: 1201, bgcolor: '#1976d2' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Admin Dashboard</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit"><MailIcon /></IconButton>
            <IconButton color="inherit"><NotificationsIcon /></IconButton>
            <Avatar alt="Admin" src="/profile.jpg" />
            <IconButton color="inherit" onClick={() => setLogoutDialogOpen(true)}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleLogoutConfirm} variant="contained" color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Topbar;