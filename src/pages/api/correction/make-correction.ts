
import JobCorrection from "@/lib/model/jobCorrection"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    await dbConnect()

        const {correction,jobId,senderId,subject} = req.body
        
        if(correction && jobId && senderId && subject){
            try{
                  const msg = await JobCorrection.create(req.body)
                  if(msg){
                    res.status(201).json({message:"Your Correction was successfully sent",successful:true})
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