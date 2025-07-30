import mongoose,{Schema} from "mongoose";


const paymentSchema= new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        enum:['bills', 'subscription', 'loan', 'tax', 'other'],
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:['PENDING','PAID','OVERDUE','CANCELLED'],
        default:'PENDING'
    }
},{timestamps:true})

export const Payment= mongoose.model("Payment",paymentSchema)