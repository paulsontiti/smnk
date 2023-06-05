import { Schema,models,model} from "mongoose";

const chatSchema = new Schema({
    
    chat:{type:String,required:true},
    receiverId:{ 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
     },
     senderId:{ 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
     },
     seen:{
        type:Boolean,
        default:false
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

const Chat = models.Chat || model('Chat', chatSchema)
export default Chat