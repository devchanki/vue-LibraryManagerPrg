const mongoose = require('mongoose');
const crypto = require('crypto');
const db = require('../db')();
const bookSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  author: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Author'},
  writtenDate: { type: Date, required: true},
  genre: {type: String, required: true, trim: true},
  quantity: {type: Number},
  id: mongoose.Schema.Types.ObjectId
});

module.exports = db.model('Book', bookSchema);
