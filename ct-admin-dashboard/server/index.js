const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Admin Routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

// ✅ Student Routes
const studentRoutes = require('./routes/studentRoutes');
app.use('/api/students', studentRoutes);

// ✅ MongoDB Connection using .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB Connected');
  app.listen(process.env.PORT || 5000, () =>
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
  );
})
.catch(err => console.error('❌ MongoDB connection error:', err));
