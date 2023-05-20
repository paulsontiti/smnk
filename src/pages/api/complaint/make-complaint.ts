
import Job from "@/lib/model/job"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    await dbConnect()

        const {complaint,jobId,subject,read,seen} = req.body
        
        if(complaint && jobId && subject){
            try{
                  const job = await Job.findById(jobId)
                  job.complaints.push({complaint,subject,read,seen})
                  const newJob = await job.save()
                  if(newJob){
                    res.status(201).json({message:"Your Complaint was successfully sent",successful:true})
                  }else{
                    res.status(201).json({message:"Sorry an error occurred,please try again",successful:false})
                  }
            }catch(err:any){
                console.log(err)
                res.status(400).json({message:"Sorry an error occurred,please try again",successful:false})
            }
        
        }else{
            res.status(400).json({message:"Incomplete details",successful:false})
        }   
    
}