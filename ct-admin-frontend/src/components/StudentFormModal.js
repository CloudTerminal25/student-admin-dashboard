import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Box
} from '@mui/material';

const paymentOptions = ['Paid', 'Partial', 'Pending'];
const qualificationOptions = ['Btech', '12th', 'Diploma', '+3'];
const modeOptions = ['Online', 'Hybrid'];

export default function StudentFormModal({ open, onClose, onSave, initialData }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', age: '',
    collage: '', qualification: '', course: '', address: '',
    paymentStatus: 'Pending', paymentAmount: '', date: '', mode: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    if (initialData) {
      setForm({
        ...initialData,
        date: initialData.date ? initialData.date.split('T')[0] : today
      });
    } else if (open) {
      setForm({
        name: '', email: '', phone: '', age: '',
        collage: '', qualification: '', course: '', address: '',
        paymentStatus: 'Pending', paymentAmount: '', date: today, mode: ''
      });
      setErrors({});
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required.';
    else if (!/^\d{10}$/.test(form.phone)) newErrors.phone = 'Phone must be 10 digits.';
    if (!form.age) newErrors.age = 'Age is required.';
    if (!form.collage.trim()) newErrors.collage = 'College is required.';
    if (!form.qualification) newErrors.qualification = 'Qualification is required.';
    if (!form.course.trim()) newErrors.course = 'Course is required.';
    if (!form.mode) newErrors.mode = 'Mode is required.';
    if (!form.address.trim()) newErrors.address = 'Address is required.';
    if (!form.paymentAmount || isNaN(form.paymentAmount)) newErrors.paymentAmount = 'Valid amount required.';
    if (!form.date) newErrors.date = 'Date is required.';
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSave(form);
    onClose();
  };

  const renderField = (name, label, props = {}) => (
    <Box mr={2} mb={2} width="300px">
      <TextField
        fullWidth
        name={name}
        label={label}
        value={form[name]}
        onChange={handleChange}
        error={!!errors[name]}
        helperText={errors[name]}
        autoComplete="off"
        {...props}
      />
    </Box>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth={false}
      PaperProps={{
        sx: { width: '1050px' }
      }}>
      <DialogTitle>{initialData ? 'Edit Student' : 'Add Student'}</DialogTitle>
      <DialogContent style={{"padding-top": "5px"}}>
        <form autoComplete="off">
          {/* Row 1 */}
          <Box display="flex" flexWrap="wrap">
            {renderField('name', 'Name')}
            {renderField('email', 'Email')}
            {renderField('phone', 'Phone', {
              type: 'tel',
              inputProps: { maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }
            })}
          </Box>

          {/* Row 2 */}
          <Box display="flex" flexWrap="wrap">
            {renderField('age', 'Age')}
            {renderField('collage', 'College')}
            <Box mr={2} mb={2} width="300px">
              <TextField
                select
                fullWidth
                name="qualification"
                label="Qualification"
                value={form.qualification}
                onChange={handleChange}
                error={!!errors.qualification}
                helperText={errors.qualification}
              >
                {qualificationOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>

          {/* Row 3 */}
          <Box display="flex" flexWrap="wrap">
            {renderField('address', 'Address')}
            <Box mr={2} mb={2} width="300px">
              <TextField
                select
                fullWidth
                name="mode"
                label="Mode"
                value={form.mode}
                onChange={handleChange}
                error={!!errors.mode}
                helperText={errors.mode}
              >
                {modeOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>
            </Box>
            {renderField('course', 'Course')}
          </Box>

          {/* Row 4 */}
          <Box display="flex" flexWrap="wrap">
            {renderField('paymentAmount', 'Payment Amount')}
            <Box mr={2} mb={2} width="300px">
              <TextField
                select
                fullWidth
                name="paymentStatus"
                label="Payment Status"
                value={form.paymentStatus}
                onChange={handleChange}
              >
                {paymentOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>
            </Box>
            <Box mr={2} mb={2} width="300px">
              <TextField
                fullWidth
                label="Registration Date"
                value={form.date}
                InputProps={{ readOnly: true }}
              />
            </Box>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initialData ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
