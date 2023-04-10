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
            
            if(proposals){
                const arr:any[] = []
                for(const pro of proposals){
                    const job = await Job.findOne({_id:pro.jobId})
                    
                    arr.push({job,pro})
                }
                res.json(arr)
            }else{
                    res.status(201).json({messsage:'No Data'})
                }
            
            
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
        
    }else{
        res.status(400).json({message:"Invalid request. Please provide Job Id"})
    }
    
    
}