
import Wallet from "@/lib/model/wallet";
import Withdrawal from "@/lib/model/withdrawal";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  const { amount, userId } = req.body;
  
    //get database connection
    await dbConnect();
   const {successful,message,error} = await WithdrawMoney(parseInt(amount),userId)
  if(error){
    res.status(500).json({message:'Server error. Please try again',successful:false})
  }else{
    res.status(201).json({message,successful})
  }
 
}

export async function WithdrawMoney(amount:number,userId:string){
  let successful = false
  let message = ''
  let error:any = null
  if (amount > 0 && userId) {
    

    try {
      const wallet = await Wallet.findOne({userId});
      if(wallet){
        if(wallet.balance >= amount){
          const withdrawal = await Withdrawal.create({amount,userId})
          
          if(withdrawal){
            wallet.balance -= amount
            const newWallet = await wallet.save()
            successful = newWallet ? true : false
            message = `${amount} successfully deducted from your wallet`
         
          }else{
            successful = false
            message =`Something went wrong. Please try again`
          }
           
        }else{
          successful = false
            message =`Insufficient balance`
        }
       
      }else{
        successful = false
        message =`Insufficient balance`
      }
     
    } catch (err) {
      console.log(err);
      error = err
    }
  }
  return {successful,message,error}
}