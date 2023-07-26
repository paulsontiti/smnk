import {NextApiResponse } from "next";
  import {multerHandler, multerUpload } from '@/lib/multer';
import dbConnect from "@/lib/mongoose";
import Job from "@/lib/model/job";
import methodOverride from 'method-override'
import mongoose from "mongoose";
import Grid from 'gridfs-stream'

export const config = {
  api:{
      bodyParser:false
  }
}



const reportUpload = async (req:any, res:NextApiResponse)=>{
  
  await dbConnect()
  try{
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
    const {report,subject,jobId} = req.body
        
    if(report && jobId  && subject){
        try{
          const reportData = {
            subject:subject,
            report:report,
            file:{
              name:req.file ? req.file.filename : '',
              contentType:req.file ? req.file.contentType : ''
            }
          }
              const job = await Job.findById(jobId)
              job.reports.push(reportData)
              const newJob = await job.save()
              if(newJob){
                res.status(201).json({message:"Your Report was successfully sent",successful:true})
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
      res.status(400).json({message:'An Error occured please try again',successful:false})
  }
 
}


multerHandler.use(methodOverride('_method')).use(multerUpload().single('reportFile'))
.post(reportUpload)
  
  export default multerHandler
