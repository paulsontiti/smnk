import Job from "@/lib/model/job";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();
  const {
    body: { searchParam },
  } = req;

  try {
    const jobs = await Job.find(
      {
        'jobDetails.category':searchParam,proposalAccepted:false
      },
      {
        jobDetails: true,
        proposals: true,
        createdAt: true,
      }
    );
    
    res.status(201).json(jobs);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "Sorry an error occurred,please try again" });
  }
}
