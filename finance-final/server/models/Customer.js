const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
  month: { type: String, required: true },
  year: { type: Number, required: true },
  status: { type: String, default: "Not Completed" }, // Default is 'Not Completed'
});

const TrackerSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  added: { type: Boolean, default: true },  // You can add more fields as needed
});

const CustomerSchema = new mongoose.Schema({
  name: String,
  address: String,
  phoneNumber: String,
  photo: String,
  initialAmount: Number,
  interestRate: Number,
  duration: Number,
  completedDues: Number,
  pendingDues: Number,
  totalAmountAfterInterest: Number,
  completedPayments: Number,
  pendingPayments: Number,
  profileCheck: Boolean,
  monthlyAmount: Number,
  dueDate: Date, // Add dueDate as a Date type field
  dateAdded: Date,
  status: [StatusSchema], // Array of status subdocuments
  tracker: { type: Boolean, default: false }, // Tracker field

});

CustomerSchema.pre("save", function (next) {
  if (!this.status || this.status.length === 0) {
    const startDate = new Date(this.dateAdded);
    for (let i = 0; i < this.duration; i++) {
      const currentMonth = new Date(startDate);
      currentMonth.setMonth(startDate.getMonth() + i);
      const month = currentMonth.toLocaleString("default", { month: "short" }).toLowerCase();
      const year = currentMonth.getFullYear().toString().slice(-2); // Extract last two digits of the year
      this.status.push({
        month: `${month}${year}`, // Format as "feb24"
        status: "Not Completed", // Default status for each month
      });
    }
  }
  next();
});

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
