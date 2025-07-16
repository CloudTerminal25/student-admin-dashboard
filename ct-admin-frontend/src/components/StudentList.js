import React, { useEffect, useState } from 'react';
import {
  Box, Button, Typography, Stack, Snackbar, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import StudentFormModal from './StudentFormModal';
import StudentViewModal from './StudentViewModal';
import API from '../api/api';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Layout from './layout/Layout';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [search, setSearch] = useState('');
  const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' });
  const [viewStudent, setViewStudent] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await API.get('/students');
      setStudents(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching students', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async (formData) => {
    try {
      if (editingStudent) {
        await API.put(`/students/${editingStudent._id}`, formData);
        setSnack({ open: true, msg: 'Student updated successfully', severity: 'success' });
      } else {
        await API.post('/students', formData);
        setSnack({ open: true, msg: 'Student added successfully', severity: 'success' });
      }
      fetchStudents();
      setOpen(false);
      setEditingStudent(null);
    } catch (err) {
      console.error('Student form error:', err);
      setSnack({ open: true, msg: 'Error submitting student data', severity: 'error' });
    }
  };

  const confirmDeleteStudent = async () => {
    try {
      await API.delete(`/students/${studentToDelete._id}`);
      fetchStudents();
      setSnack({ open: true, msg: 'Student deleted', severity: 'info' });
    } catch (err) {
      console.error('Delete error', err);
      setSnack({ open: true, msg: 'Error deleting student', severity: 'error' });
    } finally {
      setDeleteDialogOpen(false);
      setStudentToDelete(null);
    }
  };

  const searchLower = search.toLowerCase();

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchLower) ||
    student.phone.includes(search) ||
    student.paymentStatus.toLowerCase().includes(searchLower)
  );


  const columns = [
    { field: 'studentId', headerName: 'Student ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'course', headerName: 'Course', flex: 1 },
    { field: 'paymentStatus', headerName: 'Payment', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton color="primary" onClick={() => { setViewStudent(params.row); setViewOpen(true); }}>
            <VisibilityIcon />
          </IconButton>
          <IconButton color="info" onClick={() => setEditingStudent(params.row) || setOpen(true)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => {
            setStudentToDelete(params.row);
            setDeleteDialogOpen(true);
          }}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      )
    }
  ];

  return (
    <Layout>
      <Box p={4} mx="auto">
        <Typography variant="h4" color="primary" gutterBottom>
          Student Dashboard
        </Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <TextField
            label="Search students..."
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => {
              setEditingStudent(null);
              setViewStudent(null);
              setOpen(true);
            }}
          >
            + Add Student
          </Button>
        </Stack>

        <DataGrid
          rows={filteredStudents}
          columns={columns}
          getRowId={(row) => row._id}
          autoHeight
          loading={loading}
        />

        {/* Add/Edit Student Form Modal */}
        <StudentFormModal
          open={open}
          onClose={() => {
            setOpen(false);
            setEditingStudent(null);
          }}
          onSave={handleAddStudent}
          initialData={editingStudent}
        />

        {/* Student View Modal */}
        <StudentViewModal
          open={viewOpen}
          onClose={() => setViewOpen(false)}
          student={viewStudent}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Delete Student</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this student?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" color="error" onClick={confirmDeleteStudent}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar Notification */}
        <Snackbar
          open={snack.open}
          autoHideDuration={3000}
          onClose={() => setSnack({ ...snack, open: false })}
          message={snack.msg}
        />
      </Box>
    </Layout>
  );
}

export default StudentList;