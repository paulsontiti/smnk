import Job from "@/lib/model/job";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();

  const {
    query: { userId },
  } = req;

  if (userId) {
    try {
      const jobs = await Job.find({'proposals.userId':userId},{jobDetails:1,proposals:1});
      
      const newJobs = jobs.map((job)=>{
        const pro = job.proposals.filter((p:any)=>p.userId.toString() !== userId)
        const newJob = {details:job.jobDetails,proposal:pro[0]}
        return newJob
      })
      
      res.json(newJobs);
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ message: "Sorry an error occurred,please try again" });
    }
  } else {
    res.status(400).json({ message: "Invalid request. Please provide Job Id" });
  }
}
