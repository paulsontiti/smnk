import dbConnect from '../../../lib/mongoose'
import User from '../../../lib/model/userModel'
import { hashPassword } from '../sw-dashboard/change-password'

export default async function handler(req:any,res:any){
    await dbConnect()
        const {email,phone,password,type,typeClass} = req.body
        
        if(email && phone && password && type && typeClass){
            try{
                const existingUserWithEmail = await User.findOne({email:email})
                
                if(existingUserWithEmail){
                    res.status(400).json({message:"An account already exist with the email"})
                }else{
                    const existingUserWithPhone = await User.findOne({phone:phone})
                    if(existingUserWithPhone){
                        res.status(400).json({message:"An account already exist with the phone number"})
                    }else{
                        
                        const newUser = await User.create(req.body)
                        newUser.password = await hashPassword(newUser.password)
                        const user = await newUser.save()
                        res.status(201).json({message:"Your account was successfully created",user})
                    }
                   
                }
            
        }catch(err:any){
            console.log(err)
            res.status(400).json({message:err.message})
        }
        
        }else{
            res.status(400).json({message:"Invalid registration details"})
        }
       
    
    
    
}