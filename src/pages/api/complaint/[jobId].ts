
import Job from "@/lib/model/job"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    await dbConnect()
    const {query:{jobId}} = req
    try{
        const job = await Job.findById(jobId,{complaints:1,_id:0})
            res.status(201).json(job.complaints)
    }catch(err:any){
        console.log(err)
        res.status(400).json({message:"Sorry an error occurred,please try again",successful:false})
    }
}