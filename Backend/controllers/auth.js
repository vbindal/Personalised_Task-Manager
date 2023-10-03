const User = require("../models/user");
const bcrypt = require("bcrypt");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../error/custom-error");
const jwt = require("jsonwebtoken");

const signUp = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(409).json({
      message: "Username or email already exists.",
    });
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    email,
    password: hashedPassword,
  });
  await newUser.save();
  console.log(newUser);
  res.status(201).json({
    message: "User registered successfully.",
    User: newUser,
  });
  // next();
});

const logIn = asyncWrapper(async (req, res) => {
  // const cookies = req.cookies;
  // console.log(`cookie available at login: ${JSON.stringify(cookies)}`);
  const { email, password } = req.body;
  const user = await User.findOne({ email:email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const payload = {
    userID: user._id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 2589200000,
  });

  const newRefreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  user.refreshToken.push(newRefreshToken);
  await user.save();

  res.cookie("token", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 2589200000,
  });

  res.status(200).json({ message: "Login successful", token });
});



const logout = asyncWrapper(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.token) {
    return res.status(200).json({ message: "User is not logged in" });
  }

  const rToken = cookies.token;

  try {
    const foundUser = await User.findOne({
      refreshToken: { $elemMatch: { $eq: rToken } }
    }).exec();
  

    if (!foundUser) {
      return res.status(404).json({ message: "No user found" });
    }

    // Clear all refresh tokens for the user
    foundUser.refreshToken = [];
    await foundUser.save();

    // Clear the 'token' cookie
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error('Error:', error);
    res.sendStatus(500); // Internal Server Error
  }
});




const refreshTokens = asyncWrapper(async (req, res) => {
  const cookies = req.cookies;
  const rToken = cookies.token;

  try {
    const foundUser = await User.findOne({
      refreshToken: { $elemMatch: { $eq: rToken } }
    }).exec();
  

    if (!foundUser) {
      return res.sendStatus(403); // Forbidden, as the token is not associated with any user
    }

    const payload = {
      userID: foundUser._id,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 2589200000,
    });

    const newRefreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    foundUser.refreshToken.push(newRefreshToken);
    await foundUser.save();

    res.cookie("token", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 2589200000,
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Error:', error);
    res.sendStatus(500); // Internal Server Error
  }
});

module.exports = {
  signUp,
  logIn,
  logout,
  refreshTokens
};


