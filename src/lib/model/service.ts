import { Schema,model,models } from "mongoose";


const serviceSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    skills:{
        type:[String],
        required:true,
    },
    
    description:{
        type:String,
        required:true,
        trim:true,
        min:200
    },
    category:{
        type:String,
        required:true
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

const Service = models.Service || model('Service', serviceSchema)
export default Service
