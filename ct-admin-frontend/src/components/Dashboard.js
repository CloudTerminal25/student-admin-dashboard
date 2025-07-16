import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import Layout from './layout/Layout';
import API from '../api/api';

const StatCard = ({ title, value, icon, color }) => (
  <Paper elevation={3} sx={{ p: 3, bgcolor: '#ffffff', height: '100%' }}>
    <Box display="flex" alignItems="center" gap={2}>
      <Box fontSize={36}>{icon}</Box>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h5" sx={{ color, fontWeight: 'bold' }}>
          {value}
        </Typography>
      </Box>
    </Box>
  </Paper>
);

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    paid: 0,
    partial: 0,
    pending: 0
  });

  const fetchStats = async () => {
    try {
      const res = await API.get('/students/stats');
      setStats(res.data.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Layout>
      <Box px={3} pt={4}>
        <Typography variant="h4" color="primary" gutterBottom>
          Welcome To Cloud Terminal
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <StatCard title="Total Students" value={stats.totalStudents} icon="🎓" color="#1976d2" />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatCard title="Paid Students" value={stats.paid} icon="✅" color="#2e7d32" />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatCard title="Partial Payment" value={stats.partial} icon="🟡" color="#f9a825" />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatCard title="Pending Payments" value={stats.pending} icon="⚠️" color="#d32f2f" />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatCard title="Total Paid (₹)" value={`₹ ${stats.totalPaid}`} icon="💰" color="#00695c" />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

export default Dashboard;
