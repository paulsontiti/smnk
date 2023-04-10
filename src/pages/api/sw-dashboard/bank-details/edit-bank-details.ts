import Service from '@/lib/model/service'
import dbConnect from '../../../../lib/mongoose'
import BankDetail from '@/lib/model/bankDetails'



export default async function handler(req:any,res:any){
    
    await dbConnect()
        const {accountName,accountNumber,bankName,userId,_id} = req.body
        
        if(accountName && accountNumber && bankName && userId &&_id){
            try{
                
                const deleted = await BankDetail.deleteOne({_id})
                if(deleted.acknowledged){
                    const serv = await BankDetail.create(req.body)
                    if(serv){
                        res.status(201).json({successful:true,
                            message:"Your Bank Details  was successfully edited"})
                    }else{
                        res.status(400).json({successful:false,message:"Unable to edit your bank details"})
                    }
                    
                }else{
                    res.status(400).json({successful:false,message:"Unable to edit your bank details"})
                }
                
                   
            
            }catch(err:any){
                res.status(400).json({successful:false,message:err.message})
            }
            
        }else{
            res.status(400).json({successful:false,message:"Incomplete bank details info"})
        }
       
    
    
    
}