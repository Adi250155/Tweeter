import mongoose from "mongoose";
const connectMongoDB = async ()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MONGODB CONNECTED SUCCESSFULY!:${conn.connection.host}`);
    }catch(error){
        console.log(`Error connection to mongodb :${error.message}`);
        process.exit(1);
    }
}

export default connectMongoDB