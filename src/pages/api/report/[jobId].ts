import Report from '@/lib/model/report'
import dbConnect from '../../../lib/mongoose'

export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {query:{jobId}} = req
    
    try{
        if(jobId){
            const reports = await Report.find({jobId})
        res.status(200).json(reports)
        }else{
            res.status(400).json({message:'Invalid request.Provide Job Id'})
        }
        
    }catch(err){
        console.log(err)
        res.status(400).json({message:'Server error'})
    }
    
    
    
}