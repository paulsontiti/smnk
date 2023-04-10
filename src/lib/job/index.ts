
import axios from "axios"
import Job from "../model/job"

export type JobDetails ={
    title:string
    type:string
    category:string
    userId:string
    startDate:Date
    endDate:Date
    description:string
    budget:number
    agreeToTerms:boolean
    state?:string
    lga?:string
    address?:string
}
export const createJob = async(job:JobDetails,res:any)=>{
    if(job){
       try{
           const NewJob = await Job.create(job)
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

export const editJob = async(job:JobDetails,res:any,_id:string)=>{
    
    if(job){
        try{
            
            const deleted = await Job.deleteOne({_id})
            if(deleted.acknowledged){
                const newJob = await Job.create(job)
                if(newJob){
                    res.status(201).json({isJobEdited:true,
                        message:"Your Job Details  was successfully edited"})
                }else{
                    res.status(400).json({isJobEdited:false,message:"Unable to edit your job details"})
                }
                
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
