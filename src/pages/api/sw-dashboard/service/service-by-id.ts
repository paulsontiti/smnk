import dbConnect from '../../../../lib/mongoose'
import Service from '@/lib/model/service'

export default async function handler(req:any,res:any){
    await dbConnect()

      const {id} = req.body
        //console.log(id)
        if(id){
                try{
                    const serv = await Service.findOne({_id:id})
                    if(serv){
                        res.status(201).json(serv)
                    }else{
                        res.status(201).json({message:'No service'})
                    }
                    
                }catch(err:any){
                    res.status(400).json(err)
                }
        
        }else{
            res.status(400).json({message:'Invalid request'})
        }
       
    
    
    
}