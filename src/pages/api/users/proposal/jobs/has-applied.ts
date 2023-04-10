import Proposal from "@/lib/model/proposal"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {jobId,userId} = req.body
    if(jobId && userId){

        try{
            const proposals = await Proposal.find({jobId:jobId})
            let hasApplied = false
            let isApproved = false
            //console.log(proposals)
            for(const pro of proposals){
                if(pro.userId.toString() === userId){
                    hasApplied = true
                    if(pro.accepted){
                        isApproved = true
                    }
                }
            }
            
            res.status(201).json({hasApplied,isApproved})
            
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
        
    }else{
        res.status(400).json({message:"Invalid request. Please provide Job Id"})
    }
    
    
}