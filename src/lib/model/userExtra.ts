import { Schema,model,models } from "mongoose";



const userExtraSchema = new Schema({
    userId:{ 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
     },
    rating:{type:Number,default:1},
    comments:[
        {
            comment:{type:String},
            clientId:{ 
                type: Schema.Types.ObjectId,
                ref: 'User',
             },
        }
    ],
  
},
{
    timestamps:true,
    versionKey:false
})
const UserExtra = models.UserExtra || model('UserExtra', userExtraSchema)
export default UserExtra
