import Job from "@/lib/model/job";
import dbConnect from "../../../../lib/mongoose";

import IndividualPersonalInfo from "@/lib/model/individualPersonalInfo";
import User from "@/lib/model/userModel";
import CompanyProfile from "@/lib/model/companyInfo";
import SWExtra from "@/lib/model/swExtra";

export type PrefferredLocParam={
  jobType: string,
  swState: string,
  jobLocation: string,
  jobCategory: string,
  jobTitle: string,
  prefferredLocations: string[],
  servCat1: string,
  servCat2: string,
  servTitle1: string,
  servTitle2: string
}
export const getSWServiceTitesAndCategory = async (userId: string) => {
  const swExtra: any = await SWExtra.findOne(
    { userId },
    { services: true, _id: false }
  );
  const services = swExtra && swExtra.services;

  const servCat1 = services
    ? services[0] && services[0].category
      ? services[0].category.toLowerCase()
      : ""
    : "";
  const servCat2 = services
    ? services[1] && services[1].category
      ? services[1].category.toLowerCase()
      : ""
    : "";
  const servTitle1 = services
    ? services[0] && services[0].title
      ? services[0].title.toLowerCase()
      : ""
    : "";
  const servTitle2 = services
    ? services[1] && services[1].title
      ? services[1].title.toLowerCase()
      : ""
    : "";

  return { servCat1, servCat2, servTitle1, servTitle2 };
};
export const isJobInSwPrefferredLocation = (
 param:PrefferredLocParam
) => {
  if (param.jobType.toLowerCase() === "physical") {
   
    if (param.jobLocation.toLowerCase() === param.swState.toLowerCase()) {
      return isSwRecommended(
        param.jobCategory,
        param.jobTitle,
        param.servCat1,
        param.servCat2,
        param.servTitle1,
        param.servTitle2
      );
    } else {
      //return true if job is in prefferred locations
      for (let loc of param.prefferredLocations) {
        
        if (param.jobLocation.toLowerCase() === loc.toLowerCase()) {
          return isSwRecommended(
            param.jobCategory,
            param.jobTitle,
            param.servCat1,
            param.servCat2,
            param.servTitle1,
            param.servTitle2
          );
        }
        return false;
      }
    }
  } else {
    return isSwRecommended(
      param.jobCategory,
      param.jobTitle,
      param.servCat1,
      param.servCat2,
      param.servTitle1,
      param.servTitle2
    );
  }
};

const isSwRecommended = (
  jobCategory: string,
  jobTitle: string,
  servCat1: string,
  servCat2: string,
  servTitle1: string,
  servTitle2: string
) => {
  return (
    jobCategory === servCat1 ||
    jobCategory === servCat2 ||
    jobCategory === servTitle1 ||
    jobTitle === servTitle2
  );
};
const recommendedJobs = async (info: any, userId: string) => {
  let jobs: any[] = [];
  let jobDetails = [];

  if (info) {
    jobDetails = await Job.find(
      { approved: false, proposalAccepted: false },
      { jobDetails: true, proposals: true, userId: true }
    );

    //get user preferred locations
    const swExtra: any = await SWExtra.findOne({ userId });
    const prefferredLocations = swExtra.subscription.locations;
    //get sw category and service titles
    const { servCat1, servCat2, servTitle1, servTitle2 } =
      await getSWServiceTitesAndCategory(userId);
    if (jobDetails.length > 0) {
      jobs = jobDetails.filter((d: any) => {
        const jobCategory = d.jobDetails && d.jobDetails.category.toLowerCase();
        const jobTitle = d.jobDetails && d.jobDetails.title.toLowerCase();

        const param:PrefferredLocParam = {
          jobType:    d.jobDetails.type,
          swState:info.state,
          jobLocation:d.jobDetails.state,
          jobCategory,jobTitle,prefferredLocations,servCat1,servCat2,servTitle1,servTitle2
        }
        return isJobInSwPrefferredLocation(param
        );
      });
    }
  }
  const newJobs = jobs.map((job) => {
    const newJob = {
      _id: job._id,
      jobDetails: job.jobDetails,
      userId: job.userId,
    };
    return newJob;
  });
  return newJobs;
};

export async function getUserInfo(userId:string){
  let user = null
  let info = null
  try{
    user = await User.findOne({ _id:userId});
    if (user.typeClass === "individual") {
      info = await IndividualPersonalInfo.findOne({ userId });
    }else{
      info = await CompanyProfile.findOne({ userId });
    }
    return {user,info}
  }catch(err){
    return {user,info}
  }
}
export default async function handler(req: any, res: any) {
  await dbConnect();

  const { _id } = req.body;
  if (_id) {
   try{
    const {user,info} = await getUserInfo(_id)
    const jobs = await recommendedJobs(info, user);
    res.status(201).json(jobs);
   }catch(err:any){
    console.log(err)
    res.status(500).json(err);
   }
   
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
}
