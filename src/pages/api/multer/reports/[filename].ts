import mongoose from "mongoose"



export default async function handler(req:any,res:any){
    const url = process.env.MONGODB_URI as string
    const connect = mongoose.createConnection(url)

    const {query:{filename}} = req
    connect.once('open',async()=>{
        const gfs =  new mongoose.mongo.GridFSBucket(connect.db,{
            bucketName:'dps'
        })
       try{
        gfs.openDownloadStreamByName(filename).
        pipe(res);
       }catch(err){
        console.log(err)
       }
       
    })
    
   //res.json('')
}