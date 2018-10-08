const mongoose = require('mongoose');
const crypto = require('crypto');
const cyrpt = require('../crypt');
const db = require('../db')();
const bookSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  author: { type: String, required: true,trim: true },
  writtenDate: { type: Date, required: true, trim: true },
  genre: {Type: String, required: true, trim: true},
  id: mongoose.Schema.Types.ObjectId
});
module.exports = db.model('Book', bookSchema);
