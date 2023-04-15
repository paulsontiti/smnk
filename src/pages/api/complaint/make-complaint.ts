
import JobComplaint from "@/lib/model/jobComplaints"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    await dbConnect()

        const {complaint,jobId,senderId,subject} = req.body
        
        if(complaint && jobId && senderId && subject){
            try{
                  const complaint = await JobComplaint.create(req.body)
                  if(complaint){
                    res.status(201).json({message:"Your Complaint was successfully sent",successful:true})
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