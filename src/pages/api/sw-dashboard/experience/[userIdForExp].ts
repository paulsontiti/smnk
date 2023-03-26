import dbConnect from '../../../../lib/mongoose'
import PersonalInfo from '../../../../lib/model/individualPersonalInfo'
import Experience from '@/lib/model/experience'

export default async function handler(req:any,res:any){
    await dbConnect()

        const {query:{userIdForExp}} = req

        if(userIdForExp){
                try{
                    
                    const exp = await Experience.find({userId:userIdForExp})
                  
                    res.status(201).json(exp)
                }catch(err:any){
                    res.status(400).json(err)
                }
        
        }else{
            res.status(400).json({message:"Invalid request"})
        }
       
    
    
    
}