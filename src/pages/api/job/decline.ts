import Job from "@/lib/model/job";
import SWExtra from "@/lib/model/swExtra";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();

  const { jobId } = req.body;
  if (jobId) {
    try {
      const job = await Job.findOne({ _id: jobId });
      if(job){
        job.proposalAccepted = false;
        await SWExtra.findOneAndUpdate({userId:job.swId},{onAJob:false})
      const proposals = job.proposals.filter(
        (pro: any) => pro.userId.toString() !== job.swId.toString()
      );
      job.proposals = proposals;
      job.swId = undefined;
      const newJob = await job.save();
      
      res.status(201).json(newJob ? true : false);
      }else{
        res
        .status(400)
        .json({ message: "Invalid request" });
      }
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
