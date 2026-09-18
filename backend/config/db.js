import mongoose from "mongoose";

export const connectDB=async()=>{

    await mongoose.connect('mongodb+srv://parhirimjhim26_db_user:rimjhimparhi@cluster0.ug8crcm.mongodb.net/restaurant-app').then(()=> console.log('DB connected'))
}
