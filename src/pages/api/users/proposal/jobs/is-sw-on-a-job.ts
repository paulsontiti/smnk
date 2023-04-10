import Job from "@/lib/model/job"
import Proposal from "@/lib/model/proposal"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {userId} = req.body
    if(userId){

        try{
            const proposals = await Proposal.find()
            let isOnAJob = false
            
            for(const pro of proposals){
                if(pro.userId.toString() === userId){
                    if(pro.accepted){
                        const job = await Job.findOne({_id:pro.jobId})
                        if(job && !job.approved){
                            isOnAJob = true
                        }
                    }
                }
            }
            
            res.status(201).json(isOnAJob)
            
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
        
    }else{
        res.status(400).json({message:"Invalid request. Please provide Job Id"})
    }
    
    
}