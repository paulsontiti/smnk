import Job from "@/lib/model/job"
import JobPayment from "@/lib/model/jobPayment"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {jobId} = req.body
    if(jobId){
        
        try{
            const job = await Job.findOne({_id:jobId})
            const newJob = {
                approved:true,
                title:job.title,
                type:job.type,
                category:job.category,
                state:job.state,
                lga:job.lga,
                address:job.address,
                description:job.description,
                budget:job.budget,
                startDate:job.startDate,
                endDate:job.endDate,
                agreeToTerms:job.agreeToTerms,
                userId:job.userId
            }
            const deleted = await Job.deleteOne({_id:jobId})
            if(deleted.acknowledged){
                const job = await Job.create(newJob)
                //console.log(payment)
                if(job.approved){
                    res.status(201).json({message:'Job approved',successful:job.approved})
                }else{
                    res.status(201).json({message:'Job not approved',successful:job.approved})
                }
            }
            
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again",successful:false})
        }
        
    }else{
        res.status(400).json({message:"Invalid request. Please provide Job Id",successful:false})
    }
    
    
}