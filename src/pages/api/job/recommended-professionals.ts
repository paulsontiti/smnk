import Job from "@/lib/model/job";
import SWExtra from "@/lib/model/swExtra";
import dbConnect from "@/lib/mongoose";
import {
  PrefferredLocParam,
  getSWServiceTitesAndCategory,
  getUserInfo,
  isJobInSwPrefferredLocation,
} from "../sw-dashboard/jobs/recommended-jobs";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();

  const {
    body: { jobId },
  } = req;
  if (jobId) {
    try {
      const job = await Job.findById(jobId, { jobDetails: true });
      //get category and location
      const { category, state, type, title } = job.jobDetails;

      //get skilled workers who are in this category
      const swExtra = await SWExtra.find(
        {},
        { userId: true, subscription: true, _id: false }
      );
      //filter skilled workers
      const filterredSW: any[] = [];
      for (let sw of swExtra) {
        const userId = sw.userId;
        //get sw category and service titles
        const { servCat1, servCat2, servTitle1, servTitle2 } =
          await getSWServiceTitesAndCategory(userId);
        //get user preferred locations
        const prefferredLocations = sw.subscription.locations;
        //get sw info
        const { info } = await getUserInfo(userId);
        const param: PrefferredLocParam = {
          jobType: type,
          swState: info.state,
          jobLocation: state,
          jobCategory: category,
          jobTitle: title,
          prefferredLocations,
          servCat1,
          servCat2,
          servTitle1,
          servTitle2,
        };
        if (isJobInSwPrefferredLocation(param)) {
          filterredSW.push(sw);
        }
      }

      //sort by subscription type
      const swBySub: any = [];
      //add sw with gold subscription to the swSub
      for (let sw of filterredSW) {
        if (sw.subscription.type === "Gold") {
          swBySub.push(sw.userId);
        }
      }
      //add sw with silver subscription to the swSub
      for (let sw of filterredSW) {
        if (sw.subscription.type === "Silver") {
          swBySub.push(sw.userId);
        }
      }
      //add sw with bronze subscription to the swSub
      for (let sw of filterredSW) {
        if (sw.subscription.type === "Bronze") {
          swBySub.push(sw.userId);
        }
      }

      res.status(201).json(swBySub);
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
