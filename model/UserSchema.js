const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: {
    type: String,
    minlength: 6,
    validate: {
      validator: function (value) {
        const hasUpper = /[A-Z]/.test(value);
        const hasLower = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecial = /[@$!%*?&]/.test(value);

        return hasUpper && hasLower && hasNumber && hasSpecial;
      },
      message: "Password weak hai",
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  age: Number,
});

module.exports = mongoose.model("User", userSchema);