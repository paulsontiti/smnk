import SWExtra from "@/lib/model/swExtra";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  const { userId, capturedPhotoUrl } = req.body;
  if (userId) {
    //get database connection
    await dbConnect();
    try {
      const swExtra = await SWExtra.findOne({ userId });
      if (swExtra) {
        swExtra.verification = { ...swExtra.verification, capturedPhotoUrl };
        const newExtra = await swExtra.save();
        if (newExtra) {
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
      } else {
        const swExtra = await SWExtra.create({
          verification: { capturedPhotoUrl },
        });
        if (swExtra) {
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
