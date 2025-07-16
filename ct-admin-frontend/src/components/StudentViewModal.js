import React, { useRef } from 'react';
import {
  Dialog, DialogContent, DialogActions,
  Button, Box, Typography
} from '@mui/material';

function StudentViewModal({ open, onClose, student }) {
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const newWin = window.open('', '', 'width=900,height=1000');
    newWin.document.write(`
      <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', sans-serif;
              padding: 40px;
              line-height: 1.6;
              font-size: 14px;
              color: #333;
            }
            .header {
              text-align: center;
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
              color: #1976d2;
              border-bottom: 2px solid #1976d2;
              padding-bottom: 10px;
            }
            .section {
              margin-bottom: 30px;
            }
            .row {
              display: flex;
              margin-bottom: 10px;
            }
            .label {
              width: 200px;
              font-weight: 600;
              color: #444;
            }
            .value {
              flex: 1;
              border-bottom: 1px solid #ccc;
              padding-left: 8px;
            }
            .signature-row {
              display: flex;
              justify-content: space-between;
              margin-top: 60px;
              font-weight: bold;
              padding: 0 20px;
            }
          </style>
        </head>
        <body>
          <div class="header">Cloud Terminal</div>
          ${printContents}
          <div class="signature-row">
            <div>Company Signature</div>
            <div>Student Signature</div>
          </div>
        </body>
      </html>
    `);
    newWin.document.close();
    newWin.focus();
    newWin.print();
    newWin.close();
  };

  if (!student) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogContent>
        <Box ref={printRef}>
          <Typography align="center" variant="h6" color="primary" sx={{ mb: 3 }}>
            Student Details
          </Typography>

          <Box>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
              <tbody>
                {[
                  ['Name', student.name],
                  ['Email', student.email],
                  ['Phone', student.phone],
                  ['Age', student.age],
                  ['College', student.collage],
                  ['Date', student.date ? new Date(student.date).toLocaleDateString('en-GB') : '-'],
                  ['Qualification', student.qualification],
                  ['Course', student.course],
                  ['Address', student.address],
                  ['Payment Status', student.paymentStatus],
                  ['Payment Amount', `₹ ${student.paymentAmount}`],
                ].map(([label, value], index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
                    <td style={{ fontWeight: 'bold', padding: '10px', width: '30%', backgroundColor: '#f5f5f5' }}>
                      {label}
                    </td>
                    <td style={{ padding: '10px' }}>{value || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handlePrint}>Print Details</Button>
        <Button variant="contained" onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default StudentViewModal;
