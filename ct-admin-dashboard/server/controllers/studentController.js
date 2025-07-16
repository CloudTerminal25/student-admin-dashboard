const Student = require('../models/Student');

// Add new student with validation
const addStudent = async (req, res) => {
  try {
    const { name, email, phone, date, ...rest } = req.body;

    // Check for duplicates
    const existingStudent = await Student.findOne({
      $or: [{ name }, { email }, { phone }]
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student with same name, email, or phone already exists'
      });
    }

    // Generate student ID: CT + year suffix + 2-digit serial (e.g., CT2501)
    const currentYear = new Date().getFullYear();       // e.g., 2025
    const yearSuffix = currentYear.toString().slice(-2); // "25"

    const studentsThisYear = await Student.find({
      studentId: { $regex: `^CT${yearSuffix}` }
    });

    const serial = studentsThisYear.length + 1;
    const serialStr = String(serial).padStart(2, '0'); // 01, 02, etc.
    const studentId = `CT${yearSuffix}${serialStr}`;

    // Sanitize date (store only date part)
    const dateOnly = date ? new Date(date.split('T')[0]) : new Date();

    // Create and save student
    const student = new Student({
      name,
      email,
      phone,
      date: dateOnly,
      studentId,
      ...rest
    });

    await student.save();

    res.status(200).json({
      success: true,
      message: 'Student added successfully',
      data: student
    });

  } catch (error) {
    console.error('❌ Error adding student:', error);
    res.status(400).json({
      success: false,
      message: 'Something went wrong while adding student'
    });
  }
};


// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: 'Students fetched successfully',
      data: students
    });
  } catch (error) {
    console.error('❌ Error fetching students:', error);
    res.status(400).json({
      success: false,
      message: 'Something went wrong while fetching students'
    });
  }
};

// Update student
const updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(400).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('❌ Error updating student:', error);
    res.status(400).json({
      success: false,
      message: 'Something went wrong while updating student'
    });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(400).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: deleted
    });
  } catch (error) {
    console.error('❌ Error deleting student:', error);
    res.status(400).json({
      success: false,
      message: 'Something went wrong while deleting student'
    });
  }
};

// Get student stats
// Get student stats
const getStudentStats = async (req, res) => {
  try {
    const students = await Student.find();

    const totalStudents = students.length;
    const paid = students.filter(s => s.paymentStatus === 'Paid').length;
    const partial = students.filter(s => s.paymentStatus === 'Partial').length;
    const pending = students.filter(s => s.paymentStatus === 'Pending').length;

    const totalPaid = students
      .filter(s => s.paymentStatus === 'Paid')
      .reduce((sum, s) => sum + (Number(s.paymentAmount) || 0), 0);

    res.status(200).json({
      data: {
        totalStudents,
        paid,
        partial,
        pending,
        totalPaid
      }
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to get stats' });
  }
};


// ✅ Properly export all functions
module.exports = {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  getStudentStats
};