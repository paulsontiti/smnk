import Proposal from "@/lib/model/proposal"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {query:{jobId}} = req
    if(jobId){

        try{
            const proposals = await Proposal.find({jobId:jobId})
            res.status(201).json(proposals)
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
        
    }else{
        res.status(400).json({message:"Invalid request. Please provide Job Id"})
    }
    
    
}