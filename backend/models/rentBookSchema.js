const mongoose = require('mongoose');
const crypto = require('crypto');
const cyrpt = require('../crypt');
const db = require('../db')();
const rentBookSchema = new mongoose.Schema({
  name: { type: String, required: true},
  borrower: { type: String, required: true },
  rentDate: { type: Date, required: true, trim: true },
  returnDueDate: {type: Date, required: true, trim: true},
  returnDate: {type: Date, required: true, trim: true},
  id: mongoose.Schema.Types.ObjectId
});
module.exports = db.model('RentBook', rentBookSchema);
