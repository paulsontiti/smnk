import { Schema,model,models } from "mongoose";


const upgradePaymentSchema = new Schema({
    bankName:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    accountName:{
        type:String,
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
    packageName:{ 
        type: String,
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

const UpgradePayment = models.UpgradePayment || model('UpgradePayment', upgradePaymentSchema)
export default UpgradePayment
