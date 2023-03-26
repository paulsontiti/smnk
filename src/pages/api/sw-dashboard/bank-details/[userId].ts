import Service from '@/lib/model/service'
import dbConnect from '../../../../lib/mongoose'
import BankDetail from '@/lib/model/bankDetails'

export default async function handler(req:any,res:any){
    await dbConnect()

        const {query:{userId}} = req
console.log(userId)
        
        if(userId){
                try{
                    const bd = await BankDetail.findOne({userId:userId})
                    console.log(bd)
                    res.status(201).json(bd)
                }catch(err:any){
                    res.status(400).json({message:err.message})
                }
        
        }else{
            res.status(400).json({message:"Invalid request"})
        }
       
    
    
    
}