const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  email: String,
  password: String,
});

module.exports = mongoose.model('Worker', workerSchema);
