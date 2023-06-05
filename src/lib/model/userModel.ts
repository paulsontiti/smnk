import { Schema,model,models } from "mongoose";
import bcrypt from 'bcrypt'



const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true,
        lowercase:true
    },
    typeClass:{
        type:String,
        required:true,
        lowercase:true
    },
    onAJob:{type:Boolean,default:false},
    rating:{type:Number,default:1},
    comments:[
        {
            comment:{type:String},
            clientId:{ 
                type: Schema.Types.ObjectId,
                ref: 'User',
             },
        }
    ],
    dpFileName:String,
    active:{type:Boolean,default:true},
    services:[
        {
            title:{
                type:String,
                trim:true,
                lowercase:true
            },
            skills:{
                type:[String]
            },
            
            description:{
                type:String,
                trim:true,
                max:200
            },
            category:{
                type:String,
                lowercase:true
            },
        }
    ],
    subscription:{
        type:{type:String,default:'Free'},
        subscribedDate:{type:Date},
        expiringDate:{type:Date},
        pop:{type:String},
        popConfirmed:{type:Boolean,default:false}
    },
    bankDetails:{
        accountName:{
            type:String,
            trim:true,
            lowercase:true
        },
        accountNumber:{
            type:String,
            unique:true,
            trim:true,
        },
        bankName:{
            type:String,
            lowercase:true
        },
    },
    experience:[
        {
            title:{
                type:String,
                trim:true,
                lowercase:true
            },
            company:{
                type:String,
                trim:true,
                lowercase:true
            },
            onRole:{
                type:Boolean,
                default:false
            },
            state:{type:String},
            lga:{type:String},
            address:{type:String},
            description:{
                type:String,
                trim:true
            },
            startDate:{type:Date},
            endDate:Date,
        }
    ]
},
{
    timestamps:true,
    versionKey:false
})
// userSchema.pre('save',async function(next){
//     try{
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(this.password,salt)
//         this.password = hashedPassword
//         next()
//     }catch(error:any){
//         next(error)
//     }
// })
const User = models.User || model('User', userSchema)
export default User
