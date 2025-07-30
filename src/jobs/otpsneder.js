import {User} from "../model/user.model.js"
import {ApiError} from "../utiles/ApiError.js"
import {sendMail} from "./email.job.js"

const otpsender= async(email,username)=>{
 if(!(email || username))
    {
        throw new ApiError(400,"email Or Username Name Is Requied")
    }
    if(email)
        {
            
        }   
}