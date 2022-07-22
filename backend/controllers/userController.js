const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/userSchema");

// endpoint is :- /api/users ----------- Register a user
exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res
      .status(400)
      .json({ message: "Please fill in all the required details" });
  }
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400).json({ message: "User Already exists !!" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const userRegisterDetails = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (userRegisterDetails) {
    res.status(201).json({
      _id: userRegisterDetails.id,
      name: userRegisterDetails.name,
      email: userRegisterDetails.email,
      token: generateToken(userRegisterDetails.id),
    });
  } else {
    res.status(400).json({ message: "Invalid Data" });
  }
};

// endpoint is :- /api/users/login ----------- Login a user
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser && (await bcrypt.compare(password, findUser.password))) {
    res.status(200).json({
      _id: findUser.id,
      name: findUser.name,
      email: findUser.email,
      token: generateToken(findUser.id),
    });
  } else {
    res.status(400).json({ message: "Wrong Credentials" });
  }
};

// endpoint is :- /api/users/me ----------- Details of Logged in user
exports.getMe = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(401).json({ message: "No access to go this route" });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};
