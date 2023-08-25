import dbConnect from '../../../../lib/mongoose'
import Withdrawal from '@/lib/model/withdrawal'

export default async function handler(req:any,res:any){
    await dbConnect()
    
                try{
                    const withdrawal = await Withdrawal.find({done:false})
                    res.status(201).json(withdrawal)
                }catch(err:any){
                    console.log(err)
                    res.status(400).json({message:"Server Error"})
                }
    
}