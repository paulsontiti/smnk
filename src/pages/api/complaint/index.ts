
import JobComplaint from "@/lib/model/jobComplaints"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    await dbConnect()

    try{
        const complaints = await JobComplaint.find()
            res.status(201).json(complaints)
    }catch(err:any){
        console.log(err)
        res.status(400).json({message:"Sorry an error occurred,please try again",successful:false})
    }
}