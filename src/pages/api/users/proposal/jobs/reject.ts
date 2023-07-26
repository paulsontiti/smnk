import Job from "@/lib/model/job"
import User from "@/lib/model/userModel"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {propId,jobId} = req.body
    if(propId){

        try{
            //get the job to update proposal
            const job = await Job.findOne({_id:jobId})
            //find the proposal to accept
            const pro = job.proposals.find((value:any,index:number)=>{
                return value._id.toString() === propId
            })
            //get the proposal index
            const index = job.proposals.indexOf((p:any)=> p._id === propId)
            //update the proposal
            pro.rejected = true
          
            //update the job proposals
            job.proposals[index] = pro
           const j =  await job.save()
           console.log(j)
                 res.status(201).json({rejected:pro.rejected,message:"Proposal rejected"})
        }catch(err){
            console.log(err)
            res.status(400).json({rejected:false,message:"Sorry an error occurred,please try again"})
        }
        
    }else{
        res.status(400).json({rejected:false,message:"Invalid request. Please provide Proposal Id"})
    }
    
    
}