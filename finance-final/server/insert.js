const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// Import the Admin and Worker models
const Admin = require('./models/admin'); // Path to your Admin model
const Worker = require('./models/worker'); // Path to your Worker model

// Load environment variables from .env file
dotenv.config();

async function seedDatabase() {
  try {
    // Connect to MongoDB (replace this with your actual connection string)
    await mongoose.connect('mongodb+srv://student_db:student@cluster0.tt1v1.mongodb.net/finance-tracker?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Password hashing
    const saltRounds = 10;
    const adminHashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, saltRounds);
    const worker1HashedPassword = await bcrypt.hash(process.env.WORKER_PASSWORD_1, saltRounds);
    const worker2HashedPassword = await bcrypt.hash(process.env.WORKER_PASSWORD_2, saltRounds);

    // Insert the admin details into the database
    const admin = new Admin({
      email: process.env.ADMIN_EMAIL,
      password: adminHashedPassword,
    });

    // Insert the worker details into the database
    const worker1 = new Worker({
      username: process.env.WORKER_EMAIL_1,
      password: worker1HashedPassword,
    });

    const worker2 = new Worker({
      username: process.env.WORKER_EMAIL_2,
      password: worker2HashedPassword,
    });

    // Save the users to the database
    await admin.save();
    await worker1.save();
    await worker2.save();

    console.log('Admin and workers saved successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    // Disconnect from the database after seeding
    mongoose.disconnect();
  }
}

seedDatabase();
