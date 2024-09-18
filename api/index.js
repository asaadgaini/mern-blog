import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from './routes/user.route.js'
import authRoutes from "./routes/auth.route.js"
dotenv.config()

const app = express();
app.use(express.json())
app.use(cors())
mongoose
  .connect(process.env.Mongo)
  .then(() => {
    console.log("db is connect");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(3000, () => {
  console.log("server is runing in 3000 port");
});
app.use("/api/user" , userRoutes)
app.use("/api/auth" , authRoutes)

app.use((err , req ,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message ||"interval Server"
    return res.status(statusCode).json({
        success:false ,
        statusCode,
        message
    })
})