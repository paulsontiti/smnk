
import UpgradePayment from "@/lib/model/upgradePayment"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    await dbConnect()

        const {packageName,userId,bankName,accountName,amountPaid,dop} = req.body
        
        if(bankName && accountName && amountPaid && dop && userId && packageName){
            try{
                  const payment = await UpgradePayment.create(req.body)
                  if(payment){
                    res.status(201).json({message:"Your Payment Details was successfully submitted",successful:true})
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