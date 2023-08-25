import Job from "@/lib/model/job"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {query:{jobId}} = req
    if(jobId){
        
        try{
            const job = await Job.findById(jobId,{_id:false,jobDetails:true})
         if(job){
            res.status(201).json(job.jobDetails)
         }else{
            res.status(201).json(null)
         }
                    
            
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
        
    }else{
        res.status(400).json({message:"Invalid request. Please provide Proposal Id"})
    }
    
    
}