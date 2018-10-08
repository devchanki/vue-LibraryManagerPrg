const mongoose = require('mongoose');
const crypto = require('crypto');
const cyrpt = require('../crypt');
const db = require('../db')();
const authorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  bookList: { type: String, required: true },
  birthDate: { type: Date, required: true, trim: true },
  id: mongoose.Schema.Types.ObjectId
});
module.exports = db.model('Author', authorSchema);
