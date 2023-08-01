
import Error from '@/lib/model/error'
import dbConnect from '@/lib/mongoose'

export default async function handler(req:any,res:any){
    
    await dbConnect()
    
                try{
                    const newError = await Error.create({error:req.body})
                    
                    res.status(201).json('')
                }catch(err:any){
                    console.log(err)
                    res.status(400).json({message:"Server Error"})
                }
    
}