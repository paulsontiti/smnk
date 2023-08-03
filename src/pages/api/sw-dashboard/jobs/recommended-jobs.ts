import Job from "@/lib/model/job";
import dbConnect from "../../../../lib/mongoose";

import IndividualPersonalInfo from "@/lib/model/individualPersonalInfo";
import User from "@/lib/model/userModel";
import CompanyProfile from "@/lib/model/companyInfo";
import SWExtra from "@/lib/model/swExtra";

const recommendedJobs = async (info: any, userId: string) => {
  const swExtra = await SWExtra.findOne(
    { userId },
    { services: true, _id: false }
  );
  const services = swExtra && swExtra.services;
 
  const servCat1 = services
    ? (services[0] && services[0].category
      ? services[0].category.toLowerCase()
      : "")
    : "";
  const servCat2 = services
    ? (services[1] &&
      services[1].category ? services[1].category.toLowerCase() : "")
    : "";
  const servTitle1 = services
    ? (services[0] && services[0].title
      ? services[0].title.toLowerCase()
      : "")
    : "";
  const servTitle2 = services
    ? (services[1] && services[1].title ? services[1].title.toLowerCase() : "")
    : "";

  let jobs: any[] = [];
  let jobDetails = [];

  if (info) {
    jobDetails = await Job.find(
      { approved: false, proposalAccepted: false },
      { jobDetails: true, proposals: true }
    );

   if(jobDetails.length > 0){
    jobs = jobDetails.filter((d: any) => {
      const jobCategory = d.jobDetails && d.jobDetails.category.toLowerCase();
      const jobTitle = d.jobDetails && d.jobDetails.title.toLowerCase();
      const returnedCat =
        jobCategory === servCat1 ||
        jobCategory === servCat2 ||
        jobCategory === servTitle1 ||
        jobTitle === servTitle2;
      if (
        d.jobDetails && d.jobDetails.type.toLowerCase() === "physical" &&
        d.jobDetails.state.toLowerCase() === info.state.toLowerCase()
      ) {
        return returnedCat;
      } else if (d.jobDetails && d.jobDetails.type.toLowerCase() === "online") {
        return returnedCat;
      }
    });
   }
  }

  const newJobs = jobs.map((job) => {

      const newJob = { _id: job._id, details: job.jobDetails};
      return newJob;
    });
    return newJobs;
};

export default async function handler(req: any, res: any) {
  await dbConnect();

  const { _id } = req.body;
  if (_id) {
    const user = await User.findOne({ _id });

    if (user.typeClass === "individual") {
      try {
        const info = await IndividualPersonalInfo.findOne({ userId: _id });
        const jobs = await recommendedJobs(info, user);
        res.status(201).json(jobs);
      } catch (err: any) {
        console.log(err);
        res.status(400).json({ message: err.toString() });
      }
    } else {
      try {
        const info = await CompanyProfile.findOne({ userId: _id });
        const jobs = await recommendedJobs(info, user);
        res.status(201).json(jobs);
      } catch (err: any) {
        console.log(err);
        res.status(400).json({ message: err.toString() });
      }
    }
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
}
