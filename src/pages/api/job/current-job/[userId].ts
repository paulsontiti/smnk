import Job from "@/lib/model/job"
import Proposal from "@/lib/model/proposal"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {query:{userId}} = req
    if(userId){

        try{
            const proposals = await Proposal.find({userId:userId})

            let currentJob
            for(let pro of proposals){
                if(pro.accepted){
                    currentJob = await Job.findOne({_id:pro.jobId})
                }
            }
            res.status(201).json(currentJob)
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
        
    }else{
        res.status(400).json({message:"Invalid request. Please provide Job Id"})
    }
    
    
}