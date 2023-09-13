import { JobStatus } from "@/components/job/AdminJobStatus";
import Job from "@/lib/model/job";
import Rating from "@/lib/model/rating";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();

  const { jobId, userId } = req.body;
  if (jobId) {
    try {
      const job = await Job.findOne({ _id: jobId });
      const proposals = job.proposals;
      const jobStatus: JobStatus = {
        hasUserApplied: proposals ? true : false,
        isJobApproved: job.approved,
        isProposalAccepted: job.proposalAccepted,
        isJobPaidFor: job.pop ? true : false,
        clientRated: job.clientRated,
        swRated: job.swRated,
        approvedUserId: "",
        hasThisUserApplied: false,
        swPaid: job.swPaid,
        isPaymentApproved: job.popConfirmed,
        jobCommenced: job.started,
      };

      if (job.proposals) {
        for (const pro of job.proposals) {
          if (pro && pro.userId.toString() === userId) {
            jobStatus.hasThisUserApplied = true;
          }
          if (pro && pro.accepted) {
            jobStatus.approvedUserId = pro.userId;
          }
        }
      }

      res.status(201).json(jobStatus);
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
