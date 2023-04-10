
import UpgradePayment from "@/lib/model/upgradePayment"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {query:{userId}} = req
    if(userId){

        try{
            const upgrade = await UpgradePayment.findOne({userId:userId})
            if(upgrade){
                res.status(201).json(upgrade)
            }else{
                res.status(201).json({message:'An error occcurred'})
            }
            
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
        
    }else{
        res.status(400).json({message:"Invalid request. Please provide UserId"})
    }
    
    
}