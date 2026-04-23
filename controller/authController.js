const user = require("../model/User");
const bcrypt = require("bcrypt");
const jwtToken = require("jsonwebtoken");

// 🔐 SIGNUP
const signup = async (req, res) => {
  const { name, email, password, age } = req.body;

  const existingUser = await user.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await user.create({
    name,
    email,
    password: hashedPassword,
    age,
  });

  res.status(201).json({ message: "User created successfully" });
};

// 🔐 SIGNIN (COOKIE BASED)
const signin = async (req, res) => {
  const { email, password } = req.body;

  const existinguser = await user.findOne({ email });
  if (!existinguser) {
    return res.status(400).json({ message: "User not found" });
  }

  const checkPassword = await bcrypt.compare(password, existinguser.password);

  if (!checkPassword) {
    return res.status(400).json({ message: "Invalid password" });
  }

  // 🔥 JWT token
  const token = jwtToken.sign(
    { id: existinguser._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  // 🔥 COOKIE SET (IMPORTANT)
  res.cookie("token", token, {
    httpOnly: true, // 🔐 JS access nahi kar sakta
    secure: true, // 🔐 HTTPS pe hi chalega (prod me)
    sameSite: "strict",
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  res.status(200).json({ message: "Login successful" });
};

// 🔐 LOGOUT
const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

exports.signUp = signup;
exports.signIn = signin;
exports.logout = logout;
