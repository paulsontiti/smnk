import dbConnect from '../../../lib/mongoose'
import User from '../../../lib/model/userModel'
import bcrypt from 'bcrypt'

export default async function handler(req,res){
    await dbConnect()
    
    try{
        
        const {email,password} = req.body
        if(email && password){
            const user = await User.findOne({email:email})

            if(!user) {
                res.status(400).json({isLoginValid:false,Message:"invalid login details"})
            } else{
                if(bcrypt.compareSync(password,user.password)){
                    res.status(201).json({isLoginValid:true,Message:"Login was successful",user})
                }else{
                    res.status(400).json({isLoginValid:false,Message:"invalid login details"})
                }
                
            }
        }else{
            res.status(400).json({isLoginValid:false,Message:"invalid login details"})
        }

        

        
    }catch(err){
        res.json({errMsg:err.message})
    }
    
    
    
}