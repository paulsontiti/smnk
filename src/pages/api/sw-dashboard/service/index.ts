import dbConnect from '../../../../lib/mongoose'
import Service from '@/lib/model/service'

export default async function handler(req:any,res:any){
    await dbConnect()

      const {userId} = req.body
        if(userId){
                try{
                    const serv = await Service.findOne({userId})
                    if(serv){
                        res.status(201).json({serviceAdded:true,message:'Service is added'})
                    }else{
                        res.status(201).json({serviceAdded:false,message:'Service not added'})
                    }
                    
                }catch(err:any){
                    res.status(400).json(err)
                }
        
        }else{
            res.status(400).json({serviceAdded:false,message:'Invalid request'})
        }
       
    
    
    
}