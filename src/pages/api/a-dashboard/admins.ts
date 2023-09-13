import User from '@/lib/model/userModel'
import dbConnect from '@/lib/mongoose'

export default async function handler(req:any,res:any){
    await dbConnect()
    
                try{
                    const admins = await User.find({type:'admin'})
                    
                    res.status(201).json(admins)
                }catch(err:any){
                    console.log(err)
                    res.status(400).json({message:"Server Error"})
                }
    
}