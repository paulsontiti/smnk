
import { NextApiResponse} from "next";
import path from 'path';
import fs from 'fs'
import Job from '@/lib/model/job';
import { multerHandler, multerUpload } from '@/lib/multer';
import dbConnect from '@/lib/mongoose';


export const config = {
    api:{
        bodyParser:false
    }
}



multerHandler.use(multerUpload('uploads/images/pop').single('pop'))
  .post(async (req:any, res:NextApiResponse)=>{
    await dbConnect()
    try{
        const job = await Job.findOneAndUpdate({_id:req.body.jobId},{pop:req.file.filename})

        //get user dp file path
        const popPath = path.join(process.cwd(),'public',`uploads/images/dp/${job.pop}`)
     
        //check if the file exists
        if(fs.existsSync(popPath)){
         try {
           fs.unlinkSync(popPath);
         } catch (error) {
           console.log(error);
         }
        }
        
        res.status(201).json({message:'proof of payment recieved with thanks',successful:true})
    }catch(err){
        res.status(400).json({message:'An Error occured please try again',successful:false})
    }
   
  })
  
  export default multerHandler