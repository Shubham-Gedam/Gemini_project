import mongoose from "mongoose";

export async function ConnectDb() {
    
    try {
        await mongoose.connect(process.env.MONGO_URL)

        console.log("CONNECT TO DB");
        
    } catch (error) {
        console.log(error);
        
    }
}