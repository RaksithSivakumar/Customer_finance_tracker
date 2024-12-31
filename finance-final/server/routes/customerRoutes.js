const express = require('express');
const multer = require('multer');
const Customer = require('../models/Customer'); // Assuming the Customer model is in the 'models' directory
const router = express.Router();

// Set up multer for file upload
const upload = multer({ dest: 'uploads/' }); // Configure multer destination

// POST route to add a customer
// POST route to add a customer
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    const {
      name, address, phoneNumber, initialAmount, interestRate, duration,
      completedDues, pendingDues, totalAmountAfterInterest, completedPayments,
      dueDate, dateAdded, pendingPayments, monthlyAmount
    } = req.body;

    // Check for missing required fields
    if (!name || !address || !phoneNumber || !initialAmount || !interestRate || !duration || !dueDate || !dateAdded) {
      console.error('Missing required fields:', {
        name, address, phoneNumber, initialAmount, interestRate, duration, dueDate, dateAdded
      });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const parsedDueDate = new Date(dueDate);
    const parsedDateAdded = new Date(dateAdded);

    if (isNaN(parsedDueDate) || isNaN(parsedDateAdded)) {
      console.error('Invalid date format:', { dueDate, dateAdded });
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const customerPhoto = req.file ? req.file.path : null;

    const newCustomer = new Customer({
      name,
      address,
      phoneNumber,
      photo: customerPhoto,
      initialAmount,
      interestRate,
      duration,
      completedDues,
      pendingDues,
      totalAmountAfterInterest,
      completedPayments,
      pendingPayments,
      monthlyAmount,
      dueDate: parsedDueDate,
      dateAdded: parsedDateAdded,
    });

    // Debugging the auto-generated status for monthly dues
    console.log('Duration:', duration);
    console.log('Start date (dateAdded):', parsedDateAdded);

    // Ensure that both month and year are included correctly
    newCustomer.status = Array.from({ length: duration }, (_, i) => {
      const currentDate = new Date(parsedDateAdded);
      currentDate.setMonth(currentDate.getMonth() + i + 1);  // Move month forward

      // Debugging current month calculation
      console.log(`Calculating status for month ${i + 1}:`, {
        currentDate,
        month: currentDate.toLocaleString('default', { month: 'short' }).toLowerCase(),
        year: currentDate.getFullYear()
      });

      const month = currentDate.toLocaleString('default', { month: 'short' }).toLowerCase();
      const year = currentDate.getFullYear(); // Full year, no slicing required

      return {
        month: month,  // Store only the month abbreviation
        year: year,    // Store the full year (e.g., 2025)
        status: 'Not Completed',
      };
    });

    await newCustomer.save();
    console.log('Customer added successfully!');
    res.status(201).json({ message: 'Customer added successfully!', customer: newCustomer });
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).json({ message: 'Error adding customer', error });
  }
});

// Route to get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find({}, 'name address phoneNumber dueDate status photo dateAdded');
    const customersWithFullPhoto = customers.map(customer => ({
      ...customer.toObject(),
      photo: customer.photo ? `http://localhost:5000/${customer.photo}` : null,
    }));

    res.json(customersWithFullPhoto);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Error fetching customers', error });
  }
});



// Route to get customers with tracker = true
router.get('/trackers', async (req, res) => {
  try {
    const customersWithTracker = await Customer.find({ tracker: true });
    res.json(customersWithTracker);
  } catch (error) {
    console.error('Error fetching customers with tracker:', error);
    res.status(500).json({ message: 'Error fetching customers with tracker', error });
  }
});

// Route to get a specific customer by ID
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      console.error('Customer not found for ID:', req.params.id);
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    console.error('Error fetching customer details:', error);
    res.status(500).json({ message: 'Error fetching customer details', error });
  }
});

// PUT route to update customer data
router.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    console.log('Incoming data for update:', req.body);

    const updatedData = req.body;
    if (req.file) {
      updatedData.photo = req.file.path;
    }

    const { name, address, phoneNumber } = updatedData;
    if (!name || !address || !phoneNumber) {
      console.error('Missing required fields for update:', { name, address, phoneNumber });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedCustomer) {
      console.error('Customer not found for update:', req.params.id);
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer details:', error);
    res.status(500).json({ message: 'Error updating customer details', error });
  }
});

// PUT route to update monthly payment status
router.put('/:id/status/:monthIndex', async (req, res) => {
  try {
    const { status } = req.body;
    const { id, monthIndex } = req.params;

    console.log(`Updating status for customer ID: ${id}, month index: ${monthIndex}, new status: ${status}`);

    const customer = await Customer.findById(id);
    if (!customer) {
      console.error('Customer not found for ID:', id);
      return res.status(404).json({ message: 'Customer not found' });
    }

    if (!customer.status[monthIndex]) {
      console.error('Invalid month index:', monthIndex);
      return res.status(400).json({ message: 'Invalid month index' });
    }

    customer.status[monthIndex].status = status;
    await customer.save();

    console.log(`Status for month index ${monthIndex} updated successfully.`);
    res.json({ message: 'Status updated successfully', customer });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Error updating status', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error });
  }
});

// POST route to add a tracker to a customer
router.post('/:id/addTracker', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    customer.tracker = true; // Set tracker to true
    await customer.save();

    res.json({ message: 'Tracker added successfully!', customer });
  } catch (error) {
    console.error('Error adding tracker:', error);
    res.status(500).json({ message: 'Error adding tracker', error });
  }
});

// In your backend (e.g., Express.js route handler)
router.put('/:id/remove-tracker', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    customer.tracker = false; // Set tracker to true
    await customer.save();

    res.json({ message: 'Tracker added successfully!', customer });
  } catch (error) {
    console.error('Error adding tracker:', error);
    res.status(500).json({ message: 'Error adding tracker', error });
  }
});



module.exports = router;
