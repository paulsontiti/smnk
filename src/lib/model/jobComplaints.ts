import { Schema,models,model} from "mongoose";

const complaintsSchema = new Schema({
    complaint:{type:String,required:true},
    subject:{type:String,required:true},
    seen:{type:String,default:false},
    jobId:{ 
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required:true
     },
     senderId:{ 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
     },
     read:{
        type:Boolean,
        default:false
     }
},
{
    timestamps:true,
    versionKey:false
})

const JobComplaint = models.JobComplaint || model('JobComplaint', complaintsSchema)
export default JobComplaint