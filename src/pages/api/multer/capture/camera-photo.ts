import SWExtra from "@/lib/model/swExtra";
import User from "@/lib/model/userModel";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  const { userId, capturedPhotoUrl } = req.body;
  if (userId) {
    //get database connection
    await dbConnect();
    try {
      const user = await User.findById(userId);
      if (user) {
        user.verification = { ...user.verification, capturedPhotoUrl };
        const newUser = await user.save();
        if (newUser) {
          res
            .status(201)
            .json({ message: "Upload was successfull", successful: true });
        } else {
          res.status(400).json({
            message:
              "Error occurred,Upload was not successfull.Please try again",
            successful: false,
          });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: "Server error occurred.Please try again",
        successful: false,
      });
    }
  } else {
    res
      .status(400)
      .json({ message: "Server error occurred", successful: false });
  }
}
