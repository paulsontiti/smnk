import BankDetail from '@/lib/model/bankDetails'
import dbConnect from '../../../../lib/mongoose'

export default async function handler(req:any,res:any){
    await dbConnect()

      const {userId} = req.body
        if(userId){
                try{
                    const serv = await BankDetail.findOne({userId})
                    if(serv){
                        res.status(201).json({bankDetailsAdded:true,message:'Bank Details is added'})
                    }else{
                        res.status(201).json({bankDetailsAdded:false,message:'Bank Details not added'})
                    }
                    
                }catch(err:any){
                    res.status(400).json(err)
                }
        
        }else{
            res.status(400).json({bankDetailsAdded:false,message:'Invalid request'})
        }
       
    
    
    
}