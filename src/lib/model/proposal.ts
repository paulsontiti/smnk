import { Schema,models,model} from "mongoose";

const proposalSchem = new Schema({
    content:{type:String,required:true},
    userId:{ 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
     },
     jobId:{ 
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required:true
     },
     accepted:{
        type:Boolean,
        default:false
     }
},
{
    timestamps:true,
    versionKey:false
})

const Proposal = models.Proposal || model('Proposal', proposalSchem)
export default Proposal