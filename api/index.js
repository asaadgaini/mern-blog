import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoutes from './routes/user.route.js'
dotenv.config()
const app = express();
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