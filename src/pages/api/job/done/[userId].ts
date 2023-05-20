import Job from "@/lib/model/job";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const {
    query: { userId },
  } = req;

  if (userId) {
    try {
      const jobs = await Job.find({ swId: userId, approved: true });
      res.status(201).json(jobs);
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
