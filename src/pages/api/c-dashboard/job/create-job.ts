
import Job from '@/lib/model/job'
import dbConnect from '../../../../lib/mongoose'
import { JobDetails} from '@/lib/job'

const createJob = async(job:JobDetails,res:any)=>{
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

export default async function handler(req:any,res:any){
    
    await dbConnect()
        const {title,type,category,userId,
                startDate,endDate,state,lga,
                address,description,budget,agreeToTerms} = req.body
        //console.log(req.body)
        if(type === 'physical'){
            if(state && lga && address){
                const job:JobDetails = {
                    title,type,category,
                    userId,startDate,endDate,
                    description,budget,agreeToTerms,
                    state,lga,address
                }
                createJob(job,res)
            }else{
                res.status(400).json({isJobAdded:false,
                    message:"Incomplete details for creating a job,Please provide State,LGA and Adress"})
            }
        }else{
            const job:JobDetails = {
                title,
                type,
                category,
                userId,startDate,endDate,description,budget,agreeToTerms
            }
            createJob(job,res)
        }
       
       
    
    
    
}