import Job from "@/lib/model/job";
import dbConnect from "../../../lib/mongoose";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();

  const {
    query: { jobId },
  } = req;

  try {
    if (jobId) {
      const job = await Job.findById(jobId, { reports: 1,_id:0 });

      res.status(200).json(job.reports);
    } else {
      res.status(400).json({ message: "Invalid request.Provide Job Id" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Server error" });
  }
}
