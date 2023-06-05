
import Rating from '@/lib/model/rating'
import dbConnect from '@/lib/mongoose'

export default async function handler(req:any,res:any){
    await dbConnect()
    
                try{
                    const ratings = await Rating.find()
                    
                    res.status(201).json(ratings)
                }catch(err:any){
                    console.log(err)
                    res.status(400).json({message:"Server Error"})
                }
    
}