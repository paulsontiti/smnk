import Proposal from "@/lib/model/proposal"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {jobId} = req.body
    if(jobId){

        try{
            const proposals = await Proposal.find({jobId:jobId})
            let proposalAccepted = false
            for(const pro of proposals){
                if(pro.accepted){
                    proposalAccepted = true
                }
            }
            
            res.status(201).json(proposalAccepted)
            
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
        
    }else{
        res.status(400).json({message:"Invalid request. Please provide Job Id"})
    }
    
    
}