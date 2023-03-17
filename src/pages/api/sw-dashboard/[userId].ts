import dbConnect from '../../../lib/mongoose'
import PersonalInfo from '../../../lib/model/personalInfo'

export default async function handler(req:any,res:any){
    await dbConnect()

        const {query:{userId}} = req

        
        if(userId){
                try{
                    const info = await PersonalInfo.findOne({userId:userId})
                    
                    res.status(201).json(info)
                }catch(err:any){
                    res.status(400).json({isInfoAdded:false,message:err.message})
                }
        
        }else{
            res.status(400).json({isInfoAdded:false,message:"Invalid request"})
        }
       
    
    
    
}