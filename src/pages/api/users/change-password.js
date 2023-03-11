import dbConnect from '../../../lib/mongoose'
import User from '../../../lib/model/userModel'

export default async function handler(req,res){
    await dbConnect()
        const {email,phone,password} = req.body
        if(email && phone && password){
            try{
                const existingUserWithEmail = await User.findOne({email:email})

                if(existingUserWithEmail){
                    console.log(existingUserWithEmail)
                    if(existingUserWithEmail.phone === phone){

                        const newUser ={
                            email,
                            phone,
                            password,
                            type: existingUserWithEmail.type
                        }
                            const deletedUser = await User.deleteOne({email:email})
                            console.log(deletedUser)
                            if(deletedUser){
                                const user = await User.create(newUser)
                                res.status(201).json({isChangePasswordSuccessful:true,Message:"Your Password was successfully changed",user})
                            }          
                    }else{
                        res.status(400).json({isChangePasswordSuccessful:false,Message:"Phone Number does not exist"})
                    }
                }else{
                    
                    res.status(400).json({isChangePasswordSuccessful:false,Message:"Email does not exist"})
                }
            }catch(err){
                res.status(400).json({isChangePasswordSuccessful:false,Message:err.message})
            }
        
        }else{
            res.status(400).json({isChangePasswordSuccessful:false,Message:"Invalid details"})
        }
       
    
    
    
}