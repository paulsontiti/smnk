import { JobStatus } from "@/components/job/AdminJobStatus"
import Job from "@/lib/model/job"
import JobPayment from "@/lib/model/jobPayment"
import Proposal from "@/lib/model/proposal"
import Rating from "@/lib/model/rating"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {jobId,userId} = req.body
    if(jobId){

        try{
            const proposals = await Proposal.find({jobId:jobId})
            const jobStatus:JobStatus= {
                hasUserApplied : proposals.length > 0,
                isJobApproved : false,
                isProposalAccepted : false,
                isJobPaidFor : false,
                isJobRated : false,
                approvedUserId:'',
                hasThisUserApplied:false,
                swPaid:false
            }
            
            for(const pro of proposals){
                if(pro && pro.userId.toString() === userId){
                    jobStatus.hasThisUserApplied = true
                }
                if(pro && pro.accepted){
                    jobStatus.isProposalAccepted = true
                    jobStatus.approvedUserId = pro.userId
                }
            }
            const job = await Job.findOne({_id:jobId})
            if(job && job.approved){
                jobStatus.isJobApproved = true
            }
            if(job && job.swPaid){
                jobStatus.swPaid = true
            }
            
            const jobPayment = await JobPayment.findOne({jobId})
            if(jobPayment && jobPayment.confirm){
                jobStatus.isJobPaidFor = true
            }

            const jobRating = await Rating.findOne({jobId})
            if(jobRating){
                jobStatus.isJobRated = true
            }
            
            res.status(201).json(jobStatus)
            
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
        
    }else{
        res.status(400).json({message:"Invalid request. Please provide Job Id"})
    }
    
    
}