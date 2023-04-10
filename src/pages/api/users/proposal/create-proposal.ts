import Proposal from "@/lib/model/proposal"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    await dbConnect()

        const {content,userId,jobId} = req.body
        
        if(content && userId && jobId){
            try{
                  const proposal = await Proposal.create(req.body)
                  if(proposal){
                    res.status(201).json({message:"Your Proposal was successfully created",successful:true})
                  }else{
                    res.status(201).json({message:"Sorry an error occurred,please try again",successful:false})
                  }
            }catch(err:any){
                console.log(err)
                res.status(400).json({message:"Sorry an error occurred,please try again",successful:false})
            }
        
        }else{
            res.status(400).json({message:"Incomplete details",successful:false})
        }   
    
}