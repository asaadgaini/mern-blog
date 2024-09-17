import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const singup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === " " ||
    email === " " ||
    password === " "
  ) {
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
