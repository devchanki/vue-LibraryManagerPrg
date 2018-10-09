const mongoose = require('mongoose');
const crypto = require('crypto');
const cyrpt = require('../crypt');
const db = require('../db')();
const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bookList: [{type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Book'}],
  birthDate: { type: Date, required: true, trim: true },
  id: mongoose.Schema.Types.ObjectId
});
module.exports = db.model('Author', authorSchema);
