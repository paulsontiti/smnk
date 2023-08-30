import dbConnect from "../../../../lib/mongoose";
import { UpdateSWExtra } from "../bank-details/edit-bank-details";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const { userId, experience } = req.body;
  await UpdateSWExtra(userId,'experience',experience,res,'Experience')
}
