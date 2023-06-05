
import { NextApiResponse } from "next";
import { multerHandler, multerUpload } from '@/lib/multer';
import dbConnect from '@/lib/mongoose';
import methodOverride from 'method-override'
import mongoose from "mongoose";
import Grid from 'gridfs-stream'
import AdDetails from "@/lib/model/ad";

export const config = {
  api:{
      bodyParser:false
  }
}



 multerHandler.use(methodOverride('_method')).use(multerUpload().single('adImg'))
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
 
    const adBody = {
        title:req.body.title,
        description:req.body.description,
        imgName:req.file.filename,
        landingPage:req.body.landingPage
    }
  try{
    const ad = await AdDetails.create(adBody)
if(ad){
    res.status(201).json({message:'Ad created successfully',successful:true})
}else{
    res.status(201).json({message:'An error occurred',successful:false})
}
  }catch(err){
    console.log(err)
    res.status(500).redirect('/a-dashboard/ads/create')
  }
  })
  
  export default multerHandler