import Wallet from "@/lib/model/wallet";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();
  const { amount, userId } = req.body;
  const result = await CreditWallet(amount, userId);
  if(result.successful){
    res.status(201).json({message:`${amount} successfully added to this wallet`,successful:true });
  }else{
    res.status(201).json({message:`something went wrong, please try again`,successful:false });
  }
  if(result.err){
    res.status(400).json({message:`${amount} successfully something went wrong, please try again`,successful:false });
  }
}

export async function CreditWallet(amount: number, userId: string) {
  let successful:boolean = false,
  err:any = null
 
  if (amount > 0 && userId) {
    try {
      const wallet = await Wallet.findOne({ userId });
      if (wallet) {
        wallet.balance += amount;
        wallet.pop = "";
        const newWallet = await wallet.save();
        successful = newWallet ? true : false;
      } else {
        const wallet = await Wallet.create({ userId });
        wallet.balance += amount;
  wallet.pop = "";
  const newWallet = await wallet.save();
  successful = newWallet ? true : false;
      }
    } catch (err) {
     err = err
    }
  }
  return {successful,err}
}
//add money to user's wallet
async function AddMoney(wallet: any, amount: number) {
  wallet.balance += amount;
  wallet.pop = "";
  const newWallet = await wallet.save();
  console.log(newWallet)
  return newWallet ? true : false;
}
