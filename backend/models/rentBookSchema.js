const mongoose = require('mongoose');
const crypto = require('crypto');
const cyrpt = require('../crypt');
const db = require('../db')();
const userSchema = new mongoose.Schema({
  name: { type: String, required: true},
  borrower: { type: String, required: true },
  rentDate: { type: String, required: true, trim: true },
  returnDueDate: {type: String, required: true, trim: true},
  returnDate: {type: String, required: true, trim: true}
  id: mongoose.Schema.Types.ObjectId
});
module.exports = db.model('User', authorSchema);
