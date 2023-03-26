import User from "@/lib/model/userModel"
import dbConnect from "@/lib/mongoose"
import bcrypt from 'bcrypt'

export default async function handler(req:any,res:any){
    await dbConnect()
        const {oldPassword,password,_id} = req.body
        
        if(oldPassword && password && _id){
            try{
                //console.log(_id)
                const user = await User.findOne({_id})
                
                if(bcrypt.compareSync(oldPassword,user.password)){
                        const newUser ={
                           email:user.email,
                           phone:user.phone,
                           type:user.type,
                            password
                        }
                            const deletedUser = await User.deleteOne({_id})
                            
                            if(deletedUser.acknowledged){
                                const user = await User.create(newUser)
                                res.status(201).json({isChangePasswordSuccessful:true,message:"Your Password was successfully changed",user})
                            }else{
                                res.status(400).json({isChangePasswordSuccessful:false,message:"Couldn't change password"})
                            }         
                    
                }else{
                    
                    res.status(400).json({isChangePasswordSuccessful:false,message:"No user exist with your old password"})
                }
            }catch(err:any){
                res.status(400).json({isChangePasswordSuccessful:false,message:err.message})
            }
        
        }else{
            res.status(400).json({isChangePasswordSuccessful:false,message:"Invalid details"})
        }
       
    
    
    
}