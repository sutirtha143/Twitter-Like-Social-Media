import mongoose from "mongoose";

 export const connect = async () => {
    await mongoose.connect('mongodb+srv://ss:ss123@cluster0.wriqw9o.mongodb.net/')
}

