const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  collage: { type: String, required: true },
  qualification: { type: String, required: true },
  course: { type: String, required: true },
  address: { type: String, required: true },
  studentId: { type: String, required: true, unique: true},
  mode: {
    type: String,
    enum: ['Online', 'Hybrid'],
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
    required: true
  },

  paymentStatus: {
    type: String,
    enum: ['Paid', 'Pending', 'Partial'],
    default: 'Pending',
  },
  paymentAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Student', studentSchema);