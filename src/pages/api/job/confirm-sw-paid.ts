import Job from "@/lib/model/job"
import dbConnect from "@/lib/mongoose"
import { WithdrawMoney } from "../wallet/withdraw"
import { AmountPaidForJob } from "../c-dashboard/job/approve-job"
import { CreditWallet } from "../wallet/credit-account"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {jobId} = req.body
    if(jobId){
        
        try{
            const job = await Job.findOne({_id:jobId})
            const amount = AmountPaidForJob(job.jobDetails.budget)
            const {successful,err} = await CreditWallet(amount,job.swId)
            if(err){
                res.status(500).json({message:"Sorry an error occurred,please try again",successful:false})
            }  else{
               if(successful){
                job.swPaid = true
                await job.save()
                    res.status(201).json({message:`Your wallet was credited with ${amount}`,successful})
               
               }else{
                res.status(201).json({message:"Sorry an error occurred,please try again",successful:false})
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