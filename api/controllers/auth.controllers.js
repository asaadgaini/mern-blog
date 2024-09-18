import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password 
   
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

export const signin = async (req , res , next) =>{
  const { email , password} = req.body
try {
  const validUser = await User.findOne({email:email})
  if(!validUser) return res.status(404).json({message:"User not found"})
  const validPassword =  bcryptjs.compareSync(password , validUser.password)
  if(!validPassword)  return next(errorHandler(404 , "Password is wrong"))
  const token = jwt.sign({userId:validUser._id},process.env.JWT_SECRET)
  const {password:pass , ...rest} = validUser._doc
  res.cookie("access_token" ,token,{httpOnly:true}).status(200).json(rest)
} catch (error) {
  next(error)

}
}