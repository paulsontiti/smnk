import { JobDetails } from '@/lib/job'
import dbConnect from '../../../../lib/mongoose'
import Job from '@/lib/model/job'

const editJob = async(job:JobDetails,res:any,_id:string)=>{
    
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

export default async function handler(req:any,res:any){
    
    await dbConnect()
    const {title,type,category,userId,
        startDate,endDate,state,lga,
        address,description,budget,agreeToTerms,_id} = req.body

        if(type === 'physical'){
            if(state && lga && address){
                const job:JobDetails = {
                    title,type,category,
                    userId,startDate,endDate,
                    description,budget,agreeToTerms,
                    state,lga,address
                }
                editJob(job,res,_id)
            }else{
                res.status(400).json({isJobAdded:false,
                    message:"Incomplete details for editing a job,Please provide State,LGA and Adress"})
            }
        }else{

            const job:JobDetails ={
                title,type,category,userId,startDate,endDate,description,budget,agreeToTerms
            }
            
            editJob(job,res,_id)
        }
       
    
    
    
}