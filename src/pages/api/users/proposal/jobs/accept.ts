import Job from "@/lib/model/job"
import Proposal from "@/lib/model/proposal"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {propId,swId} = req.body
    
    if(propId && swId){

        try{
            const pro = await Proposal.findOneAndUpdate({_id:propId},{accepted:true},{new:true})
            const job = await Job.findOneAndUpdate({_id:pro.jobId},{proposalAccepted:true,swId},{new:true})
                 res.status(201).json(pro.accepted && job.proposalAccepted && job.swId.toString() === swId)
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
        
    }else{
        res.status(400).json({message:"Invalid request. Please provide Proposal Id"})
    }
    
    
}