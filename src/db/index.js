import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const ConnectedDB=async ()=>{
    try {
        const connectionInstance= await mongoose.connect(`${process.env.MONGOOSE_URL}/${DB_NAME}`)
        console.log(`\n MongoDB Connected !! db host : ${connectionInstance.connection.host}`)
    } catch (error) {
      console.log("src=>db=>index=>connnectDB :",error)
      process.exit(1)      
    }
}

export default ConnectedDB;