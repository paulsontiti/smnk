import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    await dbConnect()
            // try{
            //       const jobPayments = await JobPayment.find()
            //       const upgradePayments = await UpgradePayment.find()
            //         const payments =  {
            //             "jobPayments" : jobPayments,
            //             "upgradePayments" : upgradePayments
            //         }
            //         res.status(201).json(payments)
                  
            // }catch(err:any){
            //     console.log(err)
            //     res.status(400).json({message:"Sorry an error occurred,please try again"})
            // }
}