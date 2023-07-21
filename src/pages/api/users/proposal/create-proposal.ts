
  
import { NextApiResponse } from "next";
import { multerHandler, multerUpload } from '@/lib/multer';
import dbConnect from '@/lib/mongoose';
import methodOverride from 'method-override'
import mongoose from "mongoose";
import Grid from 'gridfs-stream'
import Job from "@/lib/model/job";

export const config = {
  api:{
      bodyParser:false
  }
}

const proposalUpload = async (req:any, res:NextApiResponse)=>{
  
  //connect to database and get database and connection objects
  const dbAndConnection = await dbConnect()
  //init gfs
  let gfs
  
  //create collection for profile pics uploads
  dbAndConnection?.connection.once('open',()=>{
    //init stream
    gfs = Grid(dbAndConnection.db,mongoose.mongo)
    gfs.collection('dps')
  })
try{
  const {content,userId,jobId} = req.body
      
  if(content && userId && jobId){

    try{
      const proposalData = {
        content,
        userId,
        file:{
          name:req.file ? req.file.filename : '',
          contentType: req.file ? req.file.contentType : ''
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


 multerHandler.use(methodOverride('_method')).use(multerUpload().single('proposalFile'))
  .post(proposalUpload)
  
  export default multerHandler