import { Schema,models,model} from "mongoose";

const reportSchema = new Schema({
    report:{type:String,required:true},
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

const Report = models.Report || model('Report', reportSchema)
export default Report