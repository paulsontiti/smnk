import Job from '@/lib/model/job'
import dbConnect from '../../../../lib/mongoose'

export default async function handler(req:any,res:any){
    await dbConnect()

      const {id} = req.body
      if(id){
          try{
              const job = await Job.findOne({_id:id})
              
                    if(job){
                        res.status(201).json(job)
                    }else{
                        res.status(201).json({message:'No Job found'})
                    }
                    
                }catch(err:any){
                    console.log(err)
                    res.status(400).json({message:"Server Error"})
                }
        
        }else{
            res.status(400).json({message:'Invalid request'})
        }
       
    
    
    
}