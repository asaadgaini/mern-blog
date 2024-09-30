import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username :{
        type : String ,
        require :true  ,
        unique : true
    },
    email: {
        type : String,
        require:true,
        unique:true

    },
    password : {
        type : String,
        require:true,
    },
    avatar :{
        type: String,
        default:"https://cdn-icons-png.flaticon.com/512/6386/6386976.png" 
       
    }



}, {timestamps:true})

const User = mongoose.model("User" , userSchema)
export default User