import dbConnect from "../../../lib/mongoose";
import Wallet from "@/lib/model/wallet";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();

  const {
    query: { userId },
  } = req;

  try {
    if (userId) {
      const wallet = await Wallet.findOne({userId});
      res.status(200).json(wallet);
    } else {
      res.status(400).json({ message: "Invalid request.Provide Job Id" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Server error" });
  }
}
