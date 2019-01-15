const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
});

userSchema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, null, (err, hash) => {
      if (err) return next(err);

      this.password = hash
      next();
    });
  });
});

userSchema.methods.comparePassword = function (pass, cb) {
  bcrypt.compare(pass, this.password, (err, isMatch) => {
    if (err) return cb(err);

    cb(null, isMatch);
  });
}

const User = mongoose.model('user', userSchema);

module.exports = User;
