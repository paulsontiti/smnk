import Service from '@/lib/model/service'
import dbConnect from '../../../../lib/mongoose'
import BankDetail from '@/lib/model/bankDetails'



export default async function handler(req:any,res:any){
    
    await dbConnect()
        const {accountName,accountNumber,bankName,userId} = req.body
        //console.log(req.body)
        if(accountName && accountNumber && bankName && userId){
            try{
                
                const bd = await BankDetail.create(req.body)
                res.status(201).json({successful:true,
                        message:"Your Bank Details  was successfully added"})
                   
            
            }catch(err:any){
                res.status(400).json({successful:false,message:err.message})
            }
            
        }else{
            res.status(400).json({successful:false,message:"Incomplete bank details info"})
        }
       
    
    
    
}