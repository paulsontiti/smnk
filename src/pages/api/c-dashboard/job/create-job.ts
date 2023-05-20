
import Job from '@/lib/model/job'
import dbConnect from '../../../../lib/mongoose'
import { JobDetails} from '@/lib/job'

const createJob = async(job:JobDetails,res:any)=>{
    if(job){
       try{
           const newJob = await Job.create(job)
           newJob.jobDetails = job
           newJob.save()
           res.status(201).json({isJobAdded:true,
                   message:"Your Job was successfully created"})
       
       }catch(err:any){
           console.log(err)
           res.status(400).json({isJobAdded:false,message:"Server Error: Please contact Admin"})
       }
       
   }else{
       res.status(400).json({isJobAdded:false,message:"Incomplete details for creating a job"})
   }
}

export default async function handler(req:any,res:any){
    
    await dbConnect()
        const {jobDetails} = req.body
        const {type,state,lga,
            address} = jobDetails
            
        if(type === 'physical'){
            if(state && lga && address){
                
                createJob(jobDetails,res)
            }else{
                res.status(400).json({isJobAdded:false,
                    message:"Incomplete details for creating a job,Please provide State,LGA and Adress"})
            }
        }else{
           
            createJob(jobDetails,res)
        }
       
       
    
    
    
}