import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  try {
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json({ message: "user created succefully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser) return res.status(404).json({ message: "User not found" });
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(404, "Password is wrong"));
    const token = jwt.sign({ userId: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      // User exists, sign and send token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d", // Token expiry for better security
      });
      const { password, ...rest } = user._doc;

      res
        .cookie("access_token", token, { httpOnly: true, secure: true }) // Set secure:true in production
        .status(200)
        .json(rest); // Send user details (excluding password)
    } else {
      // User doesn't exist, create a new user
      const createRandomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(createRandomPassword, 10);

      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await newUser.save();

      // Create a token for the new user
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      const { password, ...rest } = newUser._doc;

      res
        .cookie("access_token", token, { httpOnly: true, secure: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};
