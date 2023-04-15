import { Schema,model,models } from "mongoose";



const jobSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    type:{
        type:String,
        required:true,
        lowercase:true
    },
    category:{
        type:String,
        required:true,
        lowercase:true
    },
    state:{type:String},
    lga:{type:String},
    address:{type:String},
    description:{
        type:String,
        required:true,
        trim:true,
        max:200
    },
    budget:{
        type:Number,
        required:true
    },
    startDate:{type:Date,required:true},
    
    endDate:{type:Date, required:true},
    agreeToTerms:{type:Boolean,default:false},
    approved:{type:Boolean,default:false},
    proposalAccepted:{type:Boolean,default:false},
    swPaid:{type:Boolean,default:false},
    swId:{ 
        type: Schema.Types.ObjectId,
        ref: 'User'
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

const Job = models.Job || model('Job', jobSchema)
export default Job
