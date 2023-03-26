import Service from '@/lib/model/service'
import dbConnect from '../../../../lib/mongoose'



export default async function handler(req:any,res:any){
    
    await dbConnect()
        const {title,skills,category,userId,description,_id} = req.body
        
        if(title && skills && category && userId && description &&_id){
            try{
                
                const deleted = await Service.deleteOne({_id})
                if(deleted.acknowledged){
                    const serv = await Service.create(req.body)
                    if(serv){
                        res.status(201).json({isServiceAdded:true,
                            message:"Your Service  was successfully edited"})
                    }else{
                        res.status(400).json({isServiceAdded:false,message:"Unable to edit your service"})
                    }
                    
                }else{
                    res.status(400).json({isServiceAdded:false,message:"Unable to edit your service"})
                }
                
                   
            
            }catch(err:any){
                res.status(400).json({isServiceAdded:false,message:err.message})
            }
            
        }else{
            res.status(400).json({isServiceAdded:false,message:"Incomplete service info"})
        }
       
    
    
    
}