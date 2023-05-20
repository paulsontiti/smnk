import { JobDetails } from '@/lib/job'
import dbConnect from '../../../../lib/mongoose'
import Job from '@/lib/model/job'

const editJob = async(jobDetails:JobDetails,res:any,_id:string)=>{
    
    if(jobDetails){
        try{
            
            let newJob = await Job.findOne({_id})
            //edit newJob for changes
            newJob.jobDetails = jobDetails

            const newestJob = await newJob.save()
            
                if(newestJob){
                    res.status(201).json({isJobEdited:true,
                        message:"Your Job Details  was successfully edited"})
                }else{
                    res.status(400).json({isJobEdited:false,message:"Unable to edit your job details"})
                }
            
               
        
        }catch(err:any){
            console.log(err)
            res.status(400).json({isJobEdited:false,message:"Server Error . please contact Admin"})
        }
        
    }else{
        res.status(400).json({isJobEdited:false,message:"Incomplete job details info"})
    }
}

export default async function handler(req:any,res:any){
    
    await dbConnect()
    const {jobDetails,jobId} = req.body
    const {type,lga,state,address} = jobDetails

        if(type === 'physical'){
            if(state && lga && address){
                editJob(jobDetails,res,jobId)
            }else{
                res.status(400).json({isJobAdded:false,
                    message:"Incomplete details for editing a job,Please provide State,LGA and Adress"})
            }
        }else{
            editJob(jobDetails,res,jobId)
        }
       
    
    
    
}