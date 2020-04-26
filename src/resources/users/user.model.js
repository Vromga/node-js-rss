/* eslint-disable func-names */
/* eslint-disable callback-return */
/* eslint-disable no-shadow */
/* eslint-disable handle-callback-err */
const uuid = require('uuid');
const mongoose = require('mongoose');
const { genSalt, hash } = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      default: uuid
    },
    name: {
      type: String,
      required: true
    },
    login: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false
  }
);

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

// eslint-disable-next-line space-before-function-paren
userSchema.pre('save', function(next) {
  const user = this;
  const costFactor = 10;

  if (user.isModified('password')) {
    genSalt(costFactor, (err, salt) => {
      hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
