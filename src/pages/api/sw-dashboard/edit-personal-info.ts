import dbConnect from '../../../lib/mongoose'
import PersonalInfo from '../../../lib/model/personalInfo'

export default async function handler(req:any,res:any){
    await dbConnect()
        const {firstName,lastName,userName,address,description,userId} = req.body
        
        if(firstName && lastName && userName && address && description){

           
            try{
                
                
                const existingInfoWithId:any = await PersonalInfo.findOne({userId:userId})
                
                
                if(existingInfoWithId){
                    const existingInfoWithUsername = await PersonalInfo.findOne({userName:userName})
                    

                    if(existingInfoWithUsername && (existingInfoWithId && existingInfoWithId.userId && existingInfoWithId.userId.toString())
                     !== (existingInfoWithUsername && existingInfoWithUsername.userId && existingInfoWithUsername.userId.toString())){
                        res.status(400).json({isInfoAdded:false,
                            message:"An account already exist with the username,please choose anothe user name"})
                    }else{
                        
                        await PersonalInfo.deleteOne({userId:userId})
                        const info = await PersonalInfo.create(req.body)
                        res.status(201).json({isInfoAdded:true,
                                message:"Your Personal Info was successfully edited"})
                    }
                    
                }else{
                        res.status(400).json({isInfoAdded:false,message:"Bad request"})
                    }
                   
            
            }catch(err:any){
                console.log(err)
                res.status(400).json({isInfoAdded:false,message:err.message})
            }
        
        }else{
            res.status(400).json({isInfoAdded:false,message:"Incomplete personal info"})
        }
       
    
    
    
}