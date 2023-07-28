import Job from "@/lib/model/job";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();

  const {
    body: { userId,jobId },
  } = req;

  if (userId) {
    try {
      const job = await Job.findById(jobId,{proposals:true,_id:false})
      
      const pro = job.proposals.find((pro:any)=>pro.userId.toString() === userId)
    
      
      res.json(pro);
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
