import { Schema,model,models } from "mongoose";



const experienceSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    company:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    onRole:{
        type:Boolean,
        default:false
    },
    state:{type:String,required:true},
    lga:{type:String,required:true},
    address:{type:String,required:true},
    description:{
        type:String,
        required:true,
        trim:true,
        max:200
    },
    startDate:{type:Date,required:true},
    endDate:Date,
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

const Experience = models.Experience || model('Experience', experienceSchema)
export default Experience
