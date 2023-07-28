import dbConnect from "../../../../lib/mongoose";
import { UpdateSWExtra } from "../bank-details/edit-bank-details";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const { userId, services } = req.body;
  
  await UpdateSWExtra(userId,'services',services,res,'Service')
}
