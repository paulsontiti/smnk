import Job from '../../../lib/model/job'
import dbConnect from "../../../lib/mongoose";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();

  const {jobId,reportId} = req.body
  try {
    if (jobId) {
      const job = await Job.findById(jobId);
      const reports = job.reports.filter((report:any)=> report._id.toString() !== reportId)
      job.reports = reports
      
      const newJob = await job.save()
console.log(newJob)
      res.status(200).json(newJob ? true : false);
    } else {
      res.status(400).json({ message: "Invalid request. Provide report Id" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Server error" });
  }
}
