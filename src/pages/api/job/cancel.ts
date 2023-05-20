import Job from "@/lib/model/job";
import User from "@/lib/model/userModel";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();

  const { jobId } = req.body;
  if (jobId) {
    try {
      const job = await Job.findById(jobId);
      const user = await User.findByIdAndUpdate(job.swId,{onAJob:false})
      job.proposalAccepted = false;
      job.swId = undefined
      job.proposals = job.proposals.map((prop: any) => {
          if (prop.accepted) {
              prop.accepted = false;
            }
            return prop;
        });
        const newJob = await job.save()
        
      res.status(201).json(!newJob.proposalAccepted);
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ message: "Sorry an error occurred,please try again" });
    }
  } else {
    res
      .status(400)
      .json({ message: "Invalid request. Please provide Proposal Id" });
  }
}
