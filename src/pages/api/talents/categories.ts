import Job from "@/lib/model/job";
import SWExtra from "@/lib/model/swExtra";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();
  try {
    //get all the services provided by skilled workers
    const services = await SWExtra.find({}, { services: true, _id: false });
    //get categories of services
    const servOptions = services
      .map((serv) => serv.services.flat().map((s: any) => s.category))
      .flat();
    //get all the jobs
    const jobs = await Job.find({}, { jobDetails: true, _id: false });
    //get all the categories
    const jobOptions = jobs.map((job: any) => job.jobDetails.category);
    //join joboptions and servOptions
    const options = servOptions.concat(jobOptions);
    //put options in a set to get distinct category
    const setOptions = new Set(options);
    const filterredOptions:any[] = []
    setOptions.forEach((val) => {
        filterredOptions.push(val);
    });
    res.status(201).json(filterredOptions);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "Sorry an error occurred,please try again" });
  }
}
