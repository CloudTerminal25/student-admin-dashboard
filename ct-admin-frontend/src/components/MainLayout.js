// components/MainLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import Topbar from './layout/Topbar'; // optional
import { Box } from '@mui/material';

function MainLayout() {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flexGrow={1}>
        <Topbar />
        <Box p={3}>
          <Outlet /> {/* This renders the child route: Dashboard, StudentList, etc. */}
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;
