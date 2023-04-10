import User from "@/lib/model/userModel"
import dbConnect from "@/lib/mongoose"
import bcrypt from 'bcrypt'

export default async function handler(req:any,res:any){
    await dbConnect()
        const {oldPassword,password,userId} = req.body
        
        if(oldPassword && password && userId){
            try{
                //console.log(_id)
                const user = await User.findOne({_id:userId})
                console.log(user)
                
                if(bcrypt.compareSync(oldPassword,user.password)){
                        const newUser ={
                           email:user.email,
                           phone:user.phone,
                           type:user.type,
                           typeClass:user.typeClass,
                            password
                        }
                            const deletedUser = await User.deleteOne({_id:userId})
                            
                            if(deletedUser.acknowledged){
                                const user = await User.create(newUser)
                                res.status(201).json({successful:true,message:"Your Password was successfully changed",user})
                            }else{
                                res.status(400).json({successful:false,message:"Couldn't change password"})
                            }         
                    
                }else{
                    
                    res.status(400).json({successful:false,message:"No user exist with your old password"})
                }
            }catch(err:any){
                res.status(400).json({successful:false,message:err.message})
            }
        
        }else{
            res.status(400).json({successful:false,message:"Invalid details"})
        }
       
    
    
    
}