import Job from "@/lib/model/job";
import dbConnect from "../../../lib/mongoose";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();

  const {jobId,reportId} = req.body
  try {
    if (jobId) {
      const job = await Job.findById(jobId);
      for(let report of job.reports){
        if(report._id.toString() === reportId){
            report.read = true
        }
      }
      await job.save()
      res.status(200).json();
    } else {
      res.status(400).json({ message: "Invalid request.Provide Job Id" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Server error" });
  }
}
