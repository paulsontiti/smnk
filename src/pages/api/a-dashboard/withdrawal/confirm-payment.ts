import dbConnect from '../../../../lib/mongoose'
import Withdrawal from '@/lib/model/withdrawal'

export default async function handler(req:any,res:any){
    const {withdrawalId} = req.body
    if(withdrawalId){
        await dbConnect()
    
        try{
            const withdrawal = await Withdrawal.findOneAndUpdate({_id:withdrawalId},{done:true},{new:true})
            res.status(201).json(withdrawal ? true : false)
        }catch(err:any){
            console.log(err)
            res.status(400).json({message:"Server Error"})
        }
    }else{
        res.status(400).json({message:"Invalid request"})
    }
   
    
}