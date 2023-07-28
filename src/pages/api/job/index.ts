import Job from "@/lib/model/job";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();

  try {
    const jobs = await Job.find(
      { approved: false },
      { jobDetails: true }
    );
    const jobDetails = jobs.map((job) => 
      job.jobDetails.category
    );
    res.status(201).json(jobDetails);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "Sorry an error occurred,please try again" });
  }
}
