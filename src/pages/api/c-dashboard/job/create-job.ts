
import Job from '@/lib/model/job'
import dbConnect from '../../../../lib/mongoose'
import { JobDetails, createJob } from '@/lib/job'



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