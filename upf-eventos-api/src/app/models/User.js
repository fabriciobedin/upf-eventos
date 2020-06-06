import authConfig from '../../config/auth';
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified || !user.isNew) {
    next();
  } else {
    bcrypt.hash(user.password, parseInt(authConfig.salt_rounds), function(
      err,
      hash
    ) {
      if (err) {
        console.log('Error on encrypting password!', user.name);
        next({ message: err.message });
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

module.exports = model('User', userSchema);
