import { JobDetails, editJob } from '@/lib/job'
import dbConnect from '../../../../lib/mongoose'
import Job from '@/lib/model/job'



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