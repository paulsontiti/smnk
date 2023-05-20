
import Rating from "@/lib/model/rating"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {query:{userId}} = req
    if(userId){
        
        try{
            const rating = await Rating.find({swId:userId}).select('swRating')
            if(rating.length > 0){
                let swRating = 0
                rating.map((rating)=>{
                    swRating += rating.swRating
                })
                    res.status(201).json(swRating/rating.length)
                }else{
                    res.status(201).json(1)
                }
            
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
        
    }else{
        res.status(400).json({message:"Invalid request. Please provide Proposal Id"})
    }
    
    
}