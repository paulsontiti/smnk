
import dbConnect from '../../../../lib/mongoose'
import Job from '@/lib/model/job'

export default async function handler(req:any,res:any){
    await dbConnect()

        const {query:{userId}} = req

        
        if(userId){
                try{
                    const jobs = await Job.find({userId,approved:false})
                    
                    res.status(201).json(jobs)
                }catch(err:any){
                    console.log(err)
                    res.status(400).json({message:"Server Error"})
                }
        
        }else{
            res.status(400).json({message:"Invalid request"})
        }
       
    
    
    
}