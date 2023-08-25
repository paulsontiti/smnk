
import { NextApiResponse } from "next";
import { multerHandler, multerUpload } from '@/lib/multer';
import dbConnect from '@/lib/mongoose';
import methodOverride from 'method-override'
import mongoose from "mongoose";
import Grid from 'gridfs-stream'
import Wallet from "@/lib/model/wallet";

export const config = {
  api:{
      bodyParser:false
  }
}



 multerHandler.use(methodOverride('_method')).use(multerUpload().single('wallet'))
  .post(async (req:any, res:NextApiResponse)=>{
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
  
    const wallet = await Wallet.findOne({userId:req.body.userId})
    if(wallet){
        const wallet = await Wallet.findOneAndUpdate({userId:req.body.userId},{pop:req.file.filename})
    }else{
        const wallet = await Wallet.create({userId:req.body.userId,pop:req.file.filename})
    }

 res.status(201).json({message:'proof of payment recieved with thanks.Admin will credit your wallet',successful:true})
  })
  
  export default multerHandler