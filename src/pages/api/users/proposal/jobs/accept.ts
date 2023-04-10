import Proposal from "@/lib/model/proposal"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {propId} = req.body
    
    if(propId){

        try{
            const proposal = await Proposal.findOne({_id:propId})
            const newPro = {
                accepted:true,
                content:proposal.content,
                userId:proposal.userId,
                jobId:proposal.jobId
            }
            const deleted = await Proposal.deleteOne({_id:propId})
            if(deleted.acknowledged){
                const pro = await Proposal.create(newPro)
                if(pro){

                    res.status(201).json(pro.accepted)
                }
            }
            
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
        
    }else{
        res.status(400).json({message:"Invalid request. Please provide Proposal Id"})
    }
    
    
}