const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// Load .env variables
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/student_dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createAdmin() {
  const email = 'admin@ct.com';
  const password = 'admin123';

  // Check if admin already exists
  const exists = await Admin.findOne({ email });
  if (exists) {
    console.log('⚠️ Admin already exists');
    mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new Admin({
    email,
    password: hashedPassword,
  });

  await admin.save();
  console.log('✅ Admin created:', email);
  mongoose.disconnect();
}

createAdmin();