
import Rating from "@/lib/model/rating"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    await dbConnect()
    console.log('Hello')
        const {aboutSMNK,aboutSW,jobId,raterId,smnkRating,swRating} = req.body
        
        if(aboutSMNK && aboutSW && jobId && raterId){
            try{
                  const rating = await Rating.create(req.body)
                  if(rating){
                    res.status(201).json({message:"Thankyou for your feedback. Rating well received",successful:true})
                  }else{
                    res.status(201).json({message:"Sorry an error occurred,please try again",successful:false})
                  }
            }catch(err:any){
                console.log(err)
                res.status(400).json({message:"Sorry an error occurred,please try again",successful:false})
            }
        
        }else{
            res.status(400).json({message:"Incomplete details",successful:false})
        }   
    
}