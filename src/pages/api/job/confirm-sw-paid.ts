import Job from "@/lib/model/job"
import dbConnect from "@/lib/mongoose"
import { WithdrawMoney } from "../wallet/withdraw"
import { AmountPaidForJob } from "../c-dashboard/job/approve-job"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {jobId} = req.body
    if(jobId){
        
        try{
            const job = await Job.findOne({_id:jobId})
            const amount = AmountPaidForJob(job.jobDetails.budget)
          const {successful,message,error} = await WithdrawMoney(amount,job.swId)
            if(error){
                res.status(500).json({message:"Sorry an error occurred,please try again"})
            }  else{
               if(successful){
                job.swPaid = true
                const newJob = await job.save()
                if(newJob){
                    res.status(201).json({message,successful})
                }else{
                    res.status(500).json({message:"Sorry an error occurred,please try again"})
                }
               }else{
                res.status(201).json({message,successful})
               }
                
               
            } 
           
        }catch(err){
            console.log(err)
            res.status(500).json({message:"Sorry an error occurred,please try again"})
        }
        
    }else{
        res.status(500).json({message:"Invalid request. Please provide Proposal Id"})
    }
    
    
}