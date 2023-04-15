import JobPayment from "@/lib/model/jobPayment"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {paymentId} = req.body
    if(paymentId){
        
        try{
            const payment = await JobPayment.findOneAndUpdate({_id:paymentId},{confirm:true},{new:true})
           
            
                if(payment){

                    res.status(201).json(payment.confirm)
                }else{
                    res.status(201).json(false)
                }
            
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
        
    }else{
        res.status(400).json({message:"Invalid request. Please provide Proposal Id"})
    }
    
    
}