import { NextApiResponse } from "next";
import path from 'path';
import fs from 'fs'
import { multerHandler, multerUpload } from '@/lib/multer';
import dbConnect from '@/lib/mongoose';
import User from "@/lib/model/userModel";


export const config = {
    api:{
        bodyParser:false
    }
}



multerHandler.use(multerUpload('uploads/images/sub').single('sub'))
  .post(async (req:any, res:NextApiResponse)=>{
    await dbConnect()
    const {userId,type} = req.body

    try{
      const sub = {type,pop:req.file.filename}
        const newUser = await User.findByIdAndUpdate(userId,{subscription:sub})

        //get user dp file path
        const popPath = path.join(process.cwd(),'public',`uploads/images/sub/${newUser.subscription.pop}`)
     
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