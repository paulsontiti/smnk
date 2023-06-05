import AdDetails from '@/lib/model/ad'
import dbConnect from '../../../../lib/mongoose'

export default async function handler(req:any,res:any){
    await dbConnect()
    
                try{
                    const ads = await AdDetails.find()
                    res.status(201).json(ads)
                }catch(err:any){
                    console.log(err)
                    res.status(400).json({message:"Server Error"})
                }
    
}