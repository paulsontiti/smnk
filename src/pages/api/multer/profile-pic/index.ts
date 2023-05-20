import multer from 'multer'
import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from "next";
import path from 'path';
import User from '@/lib/model/userModel';
import fs from 'fs'
import { multerHandler, multerUpload } from '@/lib/multer';
import dbConnect from '@/lib/mongoose';

export const config = {
  api:{
      bodyParser:false
  }
}



 multerHandler.use(multerUpload('uploads/images/dp').single('profilePic'))
  .post(async (req:any, res:NextApiResponse)=>{
    await dbConnect()
   const user = await User.findOneAndUpdate({_id:req.body.userId},{dpFileName:req.file.filename})

   //get user dp file path
   const dpPath = path.join(process.cwd(),'public',`uploads/images/dp/${user.dpFileName}`)

   //check if the file exists
   if(fs.existsSync(dpPath)){
    try {
      fs.unlinkSync(dpPath);
    } catch (error) {
      console.log(error);
    }
   }
   
   res.status(201).json(req.file.filename)
  })
  
  export default multerHandler