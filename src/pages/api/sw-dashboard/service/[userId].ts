import Service from '@/lib/model/service'
import dbConnect from '../../../../lib/mongoose'

export default async function handler(req:any,res:any){
    await dbConnect()

        const {query:{userId}} = req

        
        if(userId){
                try{
                    const service = await Service.find({userId:userId})
                    
                    res.status(201).json(service)
                }catch(err:any){
                    res.status(400).json({message:err.message})
                }
        
        }else{
            res.status(400).json({message:"Invalid request"})
        }
       
    
    
    
}