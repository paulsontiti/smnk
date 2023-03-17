import { Schema,model,models } from "mongoose";
import User from "./userModel";



const personalInfoSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    userName:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    address:{
        type:{
            state:{type:String,required:true},
            lga:{type:String,required:true},
            street:{type:String,required:true}
        },
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
        min:200
    },
    type:{
        type:String,
        required:true
    },
    userId:{ 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true,
     }
},
{
    timestamps:true,
    versionKey:false
})

const PersonalInfo = models.PersonalInfo || model('PersonalInfo', personalInfoSchema)
export default PersonalInfo
