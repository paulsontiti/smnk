
import Job from "@/lib/model/job"
import Notification from "@/lib/model/notification"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    await dbConnect()

        const {correction,jobId,reportId,subject} = req.body
        
        if(correction && jobId && subject){
            try{
                  const job = await Job.findById(jobId)
                  let indexOfReportToUpdate = 0
                  const reportToUpdate = job.reports.find((r:any,index:number)=>{
                    indexOfReportToUpdate = index
                    return r._id.toString() === reportId
                  })
                 
                  reportToUpdate.correction = {correction,subject,date:new Date(),read:false}
                  job.reports[indexOfReportToUpdate] = reportToUpdate
                  const newJob = await job.save()
                  if(newJob){
                     //send notification to skilled worker
       await Notification.create({
        message:'You have a correction on your current job. Please check your current job for more details',
        title:'Correction from client',toUserId:job.swId
      })
                    res.status(201).json({message:"Your Correction was successfully sent",successful:true})
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