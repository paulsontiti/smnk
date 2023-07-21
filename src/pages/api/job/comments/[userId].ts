import UserExtra from "@/lib/model/userExtra";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const {
    query: { userId },
  } = req;

  if (userId) {
    try {
      const comments = await UserExtra.find({userId},{comments:true});
      res.status(201).json(comments);
    } catch (err: any) {
      console.log(err);
      res
        .status(400)
        .json({ message: "Sorry an error occurred,please try again" });
    }
  } else {
    res.status(400).json({ message: "Invalid request.Provide User Id" });
  }
}
