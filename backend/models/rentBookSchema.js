const mongoose = require('mongoose');
const crypto = require('crypto');
const db = require('../db')();
const rentBookSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Book'},
  borrower: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  rentDate: { type: Date, required: true},
  returnDueDate: {type: Date, required: true},
  returnDate: {type: Date},
  id: mongoose.Schema.Types.ObjectId
});
module.exports = db.model('RentBook', rentBookSchema);
