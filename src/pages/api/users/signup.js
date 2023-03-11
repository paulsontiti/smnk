import dbConnect from '../../../lib/mongoose'
import User from '../../../lib/model/userModel'

export default async function handler(req,res){
    await dbConnect()
        const {email,phone,password,type} = req.body
        if(email && phone && password && type){
            try{
                const existingUserWithEmail = await User.findOne({email:email})

                if(existingUserWithEmail){
                    res.status(400).json({isSignUpValid:false,Message:"An account already exist with the email"})
                }else{
                    const existingUserWithPhone = await User.findOne({phone:phone})
                    if(existingUserWithPhone){
                        res.status(400).json({isSignUpValid:false,Message:"An account already exist with the phone number"})
                    }else{
                        const user = await User.create(req.body)
                        res.status(201).json({isSignUpValid:true,Message:"Your account was successfully created",user})
                    }
                   
                }
            
        }catch(err){
            res.status(400).json({isSignUpValid:false,Message:err.message})
        }
        
        }else{
            res.status(400).json({isSignUpValid:false,Message:"Invalid registration details"})
        }
       
    
    
    
}