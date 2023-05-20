import Job from "@/lib/model/job";
import dbConnect from "../../../../lib/mongoose";

import IndividualPersonalInfo from "@/lib/model/individualPersonalInfo";
import User from "@/lib/model/userModel";
import CompanyProfile from "@/lib/model/companyInfo";

const recommendedJobs = async (info: any, user: any) => {
  const serv = user.services;
  const jobs: any[] = [];
  let jobDetails = [];

  if (info) {
    jobDetails = await Job.find(
      { approved: false, proposalAccepted: false },
      { jobDetails: 1, proposals: 1 }
    );

    const jobsByLocation = jobDetails.filter(
      (d: any) => d.jobDetails.state === info.state
    );
    jobs.push(jobsByLocation);
  }
  if (serv[0]) {
    const jobsByService1 = jobDetails.filter(
      (d) =>
        d.jobDetails.category === serv[0].category ||
        d.jobDetails.category === serv[0].title ||
        d.jobDetails.title === serv[0].title
    );
    jobs.push(jobsByService1);
  }
  if (serv[1]) {
    const jobsByService2 = jobDetails.filter(
      (d) =>
        d.jobDetails.category === serv[1].category ||
        d.jobDetails.category === serv[1].title ||
        d.jobDetails.title === serv[1].title
    );
    jobs.push(jobsByService2);
  }

  const newJobs = jobs.flat().map((job) => {
    const pro = job.proposals.filter(
      (p: any) => p.userId.toString() !== user._id
    );
    const newJob = { _id: job._id, details: job.jobDetails, proposal: pro[0] };
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
        res.status(400).json({ message: "Server Error" });
      }
    } else {
      try {
        const info = await CompanyProfile.findOne({ userId: _id });
        const jobs = await recommendedJobs(info, user);
        res.status(201).json(jobs);
      } catch (err: any) {
        console.log(err);
        res.status(400).json({ message: "Server Error" });
      }
    }
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
}
