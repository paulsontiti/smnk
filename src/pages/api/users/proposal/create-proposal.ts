import Job from "@/lib/model/job"
import dbConnect from "@/lib/mongoose"
import {NextApiResponse } from "next";
import { multerHandler, multerUpload } from "@/lib/multer";

export const config = {
  api:{
      bodyParser:false
  }
}
const proposalUpload = async (req:any, res:NextApiResponse)=>{
  
  await dbConnect()
  try{
    const {content,userId,jobId} = req.body
        
    if(content && userId && jobId){

      try{
        const proposalData = {
          content,
          userId,
          file:{
            name:req.file ? req.file.filename : ''
          }
        }
        const job = await Job.findOne({_id:jobId})
        job.proposals.push(proposalData)
        const newJob = await job.save()
        if(newJob){
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
  }catch(err){
    console.log(err)
      res.status(400).json({message:'An Error hhhhhhhhhhhhhh please try again',successful:false})
  }
 
}
multerHandler.use(multerUpload('uploads/proposals').single('proposalFile'))
  .post(proposalUpload)
  
  export default multerHandler