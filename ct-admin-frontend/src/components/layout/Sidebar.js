import React from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableChartIcon from '@mui/icons-material/TableChart';
import { NavLink } from 'react-router-dom';

const drawerWidth = 220;

function Sidebar() {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Students', icon: <TableChartIcon />, path: '/students' },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: '#1976d2',
          color: '#fff',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            component={NavLink}
            to={item.path}
            sx={{
              color: '#fff',
              textDecoration: 'none',
              '&.active': {
                backgroundColor: '#1565c0', // highlight active route
              },
            }}
            button
          >
            <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;