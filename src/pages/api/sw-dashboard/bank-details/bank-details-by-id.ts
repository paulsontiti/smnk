import BankDetail from '@/lib/model/bankDetails'
import dbConnect from '../../../../lib/mongoose'

export default async function handler(req:any,res:any){
    await dbConnect()

      const {id} = req.body
        //console.log(id)
        if(id){
                try{
                    const bd = await BankDetail.findOne({_id:id})
                    if(bd){
                        res.status(201).json(bd)
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