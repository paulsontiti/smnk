import dbConnect from '../../../lib/mongoose'
import IndividualPersonalInfo from '../../../lib/model/individualPersonalInfo'

export default async function handler(req:any,res:any){
    await dbConnect()
        const {firstName,lastName,userName,address,description,userId} = req.body
        
        if(firstName && lastName && userName && address && description && userId){

           
            try{
                const existingInfoWithId:any = await IndividualPersonalInfo.findOne({userId:userId})
                
                
                if(existingInfoWithId){
                    const existingInfoWithUsername = await IndividualPersonalInfo.findOne({userName:userName.toLowerCase()})
                    

                    if(existingInfoWithUsername && (existingInfoWithId && existingInfoWithId.userId && existingInfoWithId.userId.toString())
                     !== (existingInfoWithUsername && existingInfoWithUsername.userId && existingInfoWithUsername.userId.toString())){
                        res.status(400).json({infoEdited:false,message:"An account already exist with the username,please choose anothe user name"})
                    }else{
                        
                        await IndividualPersonalInfo.deleteOne({userId:userId})
                        const info = await IndividualPersonalInfo.create(req.body)
                        res.status(201).json({infoEdited:true,message:"Your Personal Info was successfully edited",info})
                    }
                    
                }else{
                        res.status(400).json({infoEdited:false,message:"Bad request"})
                    }
                   
            
            }catch(err:any){
                console.log(err)
                res.status(400).json({infoEdited:false,message:'something went wrong, please try again'})
            }
        
        }else{
            res.status(400).json({infoEdited:false,message:"Incomplete personal info"})
        }
       
    
    
    
}