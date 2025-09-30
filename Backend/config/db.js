import mongoose from "mongoose";

export const connectDB = () =>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("db connected")
    )
}