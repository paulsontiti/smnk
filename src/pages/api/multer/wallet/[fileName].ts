
import mongoose from "mongoose"



export default async function handler(req:any,res:any){
    const url = process.env.MONGODB_URI as string
    const connect = mongoose.createConnection(url)

    const {query:{fileName}} = req
    connect.once('open',async()=>{
        const gfs =  new mongoose.mongo.GridFSBucket(connect.db,{
            bucketName:'dps'
        })
       try{
        gfs.openDownloadStreamByName(fileName).
        pipe(res);
       }catch(err){
        console.log(err)
       }
       
    })
    
   //res.json('')
}