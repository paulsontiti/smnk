import Service from '@/lib/model/service'
import dbConnect from '../../../../lib/mongoose'
import Job from '@/lib/model/job'

export default async function handler(req:any,res:any){
    await dbConnect()

        const {query:{userId}} = req

        
        if(userId){
                try{
                    const job = await Job.find({userId:userId})
                    
                    res.status(201).json(job)
                }catch(err:any){
                    console.log(err)
                    res.status(400).json({message:"Server Error"})
                }
        
        }else{
            res.status(400).json({message:"Invalid request"})
        }
       
    
    
    
}