import BankDetail from "@/lib/model/bankDetails"
import Job from "@/lib/model/job"
import Proposal from "@/lib/model/proposal"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {query:{userId}} = req
    if(userId){
        try{
           
            const bankDetails = await BankDetail.findOne({userId})
            //console.log(bankDetails)
            res.status(201).json(bankDetails)
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
        
    }else{
        res.status(400).json({message:"Invalid request. Please provide Job Id"})
    }
    
    
}