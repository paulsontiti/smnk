import Service from '@/lib/model/service'
import dbConnect from '../../../../lib/mongoose'



export default async function handler(req:any,res:any){
    
    await dbConnect()
        const {title,skills,category,userId,description} = req.body
        
        if(title && skills && category && userId && description){
            try{
                
                const serv = await Service.create(req.body)
                if(serv){
                    res.status(201).json({isServiceAdded:true,
                        message:"Your Service  was successfully added"})
                }else{
                    res.status(401).json({isServiceAdded:false,
                        message:"An error occured, please try again"})
                }
            
            }catch(err:any){
                console.log(err)
                res.status(400).json({isServiceAdded:false,message:'Internal server error,please try again'})
            }
            
        }else{
            res.status(400).json({isServiceAdded:false,message:"Incomplete service info"})
        }
       
    
    
    
}