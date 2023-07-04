import Job from "@/lib/model/job";
import dbConnect from "../../../../lib/mongoose";

import IndividualPersonalInfo from "@/lib/model/individualPersonalInfo";
import User from "@/lib/model/userModel";
import CompanyProfile from "@/lib/model/companyInfo";
import SWExtra from "@/lib/model/swExtra";

const recommendedJobs = async (info: any, userId: string) => {
  const swExtra = await SWExtra.findOne({userId},{services:true,_id:false})
  const services = swExtra && swExtra.services
  const servCat1 = services ? services[0].category :''
  const servCat2 = services ? (services[1] && services[1].category) :''
  const servTitle1 = services ? services[0].title :''
  const servTitle2 = services ? (services[1] && services[1].title) :''
  let jobs: any[] = [];
  let jobDetails = [];

  if (info) {
    jobDetails = await Job.find(
      { approved: false, proposalAccepted: false },
      { jobDetails: true, proposals: true }
    );


     jobs = jobDetails.filter(
      (d: any) =>{

      if(d.jobDetails.state === info.state ){
        return  d.jobDetails.category === servCat1 ||  d.jobDetails.category === servCat2 ||
              d.jobDetails.category === servTitle1 ||
              d.jobDetails.title === servTitle2
      }else if(d.jobDetails.type === 'online'){
       
        return  d.jobDetails.category === servCat1 ||  d.jobDetails.category === servCat2 ||
        d.jobDetails.category === servTitle1 ||
        d.jobDetails.title === servTitle2
      }
      }
    );
  }

 
 
//  console.log(jobs)
//   let filterredJobs:any[] = []
//  jobs.flat().map((job)=>{
//    //check if the job exists in filterredJobs
//    if(!filterredJobs.find((j)=>j._id.toString() === job._id.toString())){
//     filterredJobs.push(job)
//      }
//  })
//map the jobs and return a new job object{_id,jobDetails}
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
