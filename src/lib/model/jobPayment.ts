  import { Schema,model,models } from "mongoose";


const jobPaymentSchema = new Schema({
    bankName:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    accountName:{
        type:[String],
        required:true,
        trim:true,
        lowercase:true
    },
    
    amountPaid:{
        type:Number,
        required:true,
    },
    dop:{
        type:Date,
        required:true
    },
    confirm:{type:Boolean,default:false},
    jobId:{ 
        type: Schema.Types.ObjectId,
        ref: 'Job',
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

const JobPayment = models.JobPayment || model('JobPayment', jobPaymentSchema)
export default JobPayment
