const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const multer = require('multer'); 
const workerRoutes = require('./routes/addWorkerRoute');
require('dotenv').config();

// Import the routes
const adminRoutes = require('./routes/adminRoutes');
const customerRoutes = require('./routes/customerRoutes'); // Import customer routes

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });
app.use('/uploads', express.static('uploads'));
// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/customers', customerRoutes); // Add customer routes
app.use("/api", workerRoutes);

// Admin login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Login successful!',
      token,
    });
  } else {
    res.status(401).json({
      message: 'Invalid email or password!',
    });
  }
});

app.post("/customers", upload.single("photo"), (req, res) => {
  console.log("Received form data:", req.body);
  console.log("Uploaded file info:", req.file);

  const { name, address, phoneNumber, initialAmount, interestRate, duration } =
    req.body;
  const photoPath = req.file ? req.file.path : null;

  // Construct response for verification
  const customerData = {
    name,
    address,
    phoneNumber,
    photoPath,
    initialAmount,
    interestRate,
    duration,
  };

  console.log("Customer data being returned:", customerData);

  // Return response
  res.json({
    success: true,
    message: "Customer preview received successfully",
    data: customerData,
  });
});


// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});