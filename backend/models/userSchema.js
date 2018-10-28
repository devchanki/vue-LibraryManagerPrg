const mongoose = require('mongoose');
const crypto = require('crypto');
const db = require('../db')();
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, match : /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/ },
  password: { type: String, required: true, trim: true },
  admin:{ type: Boolean },
  bookLentCount: {type: Number,  trim:true},
  salt: { type: String, required: true, trim: true },
  id: mongoose.Schema.Types.ObjectId
});

// userSchema.index({ email: 1 });

userSchema.methods.comparePassword = function(password, cb)  {
  crypto.pbkdf2(password, this.salt, 12345, 64, 'sha512', (err, key) => {
    if(key.toString('base64') == this.password) {
      cb(null, true);
    } else {
      cb('error');
    }
  })
};

module.exports = db.model('User', userSchema);
