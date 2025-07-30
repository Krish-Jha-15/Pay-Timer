import mongoose,{Schema} from "mongoose";

const reminderSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    reminderIn:{
        type:Number,
        required:true
    },
    numberOfTime:{
        type:Number,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    startDate:{
        type:Date,
        required:true
    },
    sentCount:{
        type:Number,
        default:1
    },
    lastsentAt:{
        type:Date,
        required:true
    }
},{timestamps:true})

export const Reminder= mongoose.model("Reminder",reminderSchema)