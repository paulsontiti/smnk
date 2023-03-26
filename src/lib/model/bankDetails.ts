import { Schema,model,models } from "mongoose";
import bcrypt from 'bcrypt'



const bankDetailsSchema = new Schema({
    accountName:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    accountNumber:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    bankName:{
        type:String,
        required:true,
        lowercase:true
    },
    userId:{ 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
     }
},
{
    timestamps:true,
    versionKey:false
})

const BankDetail = models.BankDetail || model('BankDetail', bankDetailsSchema)
export default BankDetail
