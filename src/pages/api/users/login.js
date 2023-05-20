import dbConnect from '../../../lib/mongoose'
import User from '../../../lib/model/userModel'
import bcrypt from 'bcrypt'

export default async function handler(req,res){
    
    
    try{
        await dbConnect()

        const {email,password} = req.body
        if(email && password){
            const user = await User.findOne({email:email})
            
            if(!user) {
                res.status(201).json({message:"invalid login details"})
            } else{
                if(bcrypt.compareSync(password,user.password)){
                    res.status(201).json({message:"Login was successful",user})
                }else{
                    res.status(201).json({message:"invalid login details"})
                }
                
            }
        }else{
            res.status(400).json({loginDetails:{isLoginValid:false,message:"invalid login details"}})
        }

        

        
    }catch(err){
        console.log(err)
        res.status(400).json({isLoginValid:false,message:err.message})
    }
    
    
    
}