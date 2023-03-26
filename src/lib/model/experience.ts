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
    state:{type:String,required:true,
        lowercase:true},
    lga:{type:String,required:true,
        lowercase:true},
    address:{type:String,required:true,
        lowercase:true},
    description:{
        type:String,
        required:true,
        trim:true,
        min:200
    },
    city:{
        type:String,
        required:true,
        lowercase:true
    },
    startMonth:{type:String,required:true,
        lowercase:true},
    startYear:{type:String,required:true,
        lowercase:true},
    endMonth:{type:String,
        lowercase:true},
    endYear:{type:String,
        lowercase:true},
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
