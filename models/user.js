<<<<<<< HEAD
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
=======
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
>>>>>>> e14f187197f2d9829053d6196c5101683fd21dd7
mongoose.promise = Promise;

// Define userSchema
const userSchema = new Schema({
  username: { type: String, unique: false, required: false },
<<<<<<< HEAD
  password: { type: String, unique: false, required: false }
=======
  password: { type: String, unique: false, required: false },
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book"
  }
>>>>>>> e14f187197f2d9829053d6196c5101683fd21dd7
});

// Define schema methods
userSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

// Define hooks for pre-saving
<<<<<<< HEAD
userSchema.pre('save', function(next) {
  if (!this.password) {
    console.log('models/user.js =======NO PASSWORD PROVIDED=======');
    next();
  } else {
    console.log('models/user.js hashPassword in pre save');
=======
userSchema.pre("save", function(next) {
  if (!this.password) {
    console.log("models/user.js =======NO PASSWORD PROVIDED=======");
    next();
  } else {
    console.log("models/user.js hashPassword in pre save");
>>>>>>> e14f187197f2d9829053d6196c5101683fd21dd7

    this.password = this.hashPassword(this.password);
    next();
  }
});

<<<<<<< HEAD
const User = mongoose.model('User', userSchema);
=======
const User = mongoose.model("User", userSchema);
>>>>>>> e14f187197f2d9829053d6196c5101683fd21dd7
module.exports = User;
