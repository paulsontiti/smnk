import SWExtra from "@/lib/model/swExtra";
import UserExtra from "@/lib/model/userExtra";
import User from "@/lib/model/userModel";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();
  const {
    body: { userId },
  } = req;
console.log(userId)
  try {
    const swExtras = await SWExtra.findOne(
    {userId},      {
        experience: true,
        services: true,
        catalog: true,
        onAJob:true,
        level:true,subscription:true
      }
    );
    const user = await User.findOne({_id:userId})
    const userExtra = await UserExtra.findOne({userId})


    res.status(201).json({swExtras,user,userExtra});
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "Sorry an error occurred,please try again" });
  }
}
