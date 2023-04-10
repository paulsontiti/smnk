import JobPayment from "@/lib/model/jobPayment"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {paymentId} = req.body
    if(paymentId){
        
        try{
            const payment = await JobPayment.findOne({_id:paymentId})
            const newPayment = {
                confirm:true,
                bankName:payment.bankName,
                accountName:payment.accountName,
                amountPaid:payment.amountPaid,
                dop:payment.dop,
                userId:payment.userId,
                jobId:payment.jobId
            }
            const deleted = await JobPayment.deleteOne({_id:paymentId})
            if(deleted.acknowledged){
                const payment = await JobPayment.create(newPayment)
                //console.log(payment)
                if(payment){

                    res.status(201).json(payment.confirm)
                }
            }
            
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
        
    }else{
        res.status(400).json({message:"Invalid request. Please provide Proposal Id"})
    }
    
    
}