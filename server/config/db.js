import mongoose  from "mongoose";

const connectDB = async () => {
  try{
    await mongoose.connect('mongodb://localhost:27017/quickNote')
    console.log('connect to db successfully')
  }
  catch(err){
    console.log("error while connecting to db : ",err)
  }
};

export default connectDB
