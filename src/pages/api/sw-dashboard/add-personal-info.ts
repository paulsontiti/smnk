import dbConnect from '../../../lib/mongoose'
import PersonalInfo from '../../../lib/model/personalInfo'

export default async function handler(req:any,res:any){
    await dbConnect()
        const {firstName,lastName,userName,address,description} = req.body
        
        if(firstName && lastName && userName && address && description){
            try{
                const existingInfoWithUsername = await PersonalInfo.findOne({userName:userName})
                if(existingInfoWithUsername){
                    res.status(400).json({isInfoAdded:false,
                        message:"An account already exist with the username,please choose anothe user name"})
                }else{
                        const info = await PersonalInfo.create(req.body)
                        res.status(201).json({isInfoAdded:true,
                                message:"Your Personal Info was successfully added"})
                    }
                   
            
        }catch(err:any){
            res.status(400).json({isInfoAdded:false,message:err.message})
        }
        
        }else{
            res.status(400).json({isInfoAdded:false,message:"Incomplete personal info"})
        }
       
    
    
    
}