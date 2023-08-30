import Job from "@/lib/model/job"
import SWExtra from "@/lib/model/swExtra"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {jobId} = req.body
    if(jobId){
        
        try{
            const job = await Job.findOneAndUpdate({_id:jobId},{approved:true},{new:true})
            await SWExtra.findOneAndUpdate({userId:job.swId},{onAJob:false})
            if(job.approved){
                res.status(201).json({message:'Job approved',successful:job.approved})
            }else{
                res.status(201).json({message:'Job not approved',successful:job.approved})
            }
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again",successful:false})
        }
        
    }else{
        res.status(400).json({message:"Invalid request. Please provide Job Id",successful:false})
    }
    
    
}
export function AmountPaidForJob(budget:number){
    return budget - ((12 * budget)/100)
}