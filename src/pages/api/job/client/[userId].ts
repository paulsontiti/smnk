import Job from "@/lib/model/job";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const {
    query: { userId },
  } = req;

  if (userId) {
    try {
      const completedJobs = await Job.find({ userId, approved: true });
      const pendingJobs = await Job.find({ userId, approved: false });
      res.status(201).json({completedJobs,pendingJobs});
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
