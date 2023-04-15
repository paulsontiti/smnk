
import { Schema,models,model} from "mongoose";

const ratingSchema = new Schema({
    aboutSMNK:{type:String,required:true},
    aboutSW:{type:String,required:true},
    smnkRating:{type:Number,default:1},
    swRating:{type:Number,default:1},
    jobId:{ 
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required:true,
        unique:true
     },
     raterId:{ 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
     }
},
{
    timestamps:true,
    versionKey:false
})

const Rating = models.Rating || model('Rating', ratingSchema)
export default Rating