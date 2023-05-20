import dbConnect from '../../../../lib/mongoose'
import Job from '@/lib/model/job'

export default async function handler(req:any,res:any){
    await dbConnect()
    
                try{
                    const jobs = await Job.find()
                    
                    res.status(201).json(jobs)
                }catch(err:any){
                    console.log(err)
                    res.status(400).json({message:"Server Error"})
                }
    
}