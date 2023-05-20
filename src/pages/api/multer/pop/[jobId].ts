import Job from "@/lib/model/job"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    await dbConnect()
    const {query:{jobId}} = req

    if(jobId){

        try{
              const job = await Job.findOne({_id:jobId}).select('pop')
                res.status(201).json(job.pop)
              
        }catch(err:any){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
    }else{
        res.status(400).json({message:"Invalid request. Provide User Id"})
    }
}