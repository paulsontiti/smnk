import Job from "@/lib/model/job";
import Notification from "@/lib/model/notification";
import SWExtra from "@/lib/model/swExtra";
import User from "@/lib/model/userModel";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();

  const { propId, swId, jobId } = req.body;
  if (propId && swId) {
    try {
      //get the job to update proposal
      const job = await Job.findOne({ _id: jobId });
      //find the proposal to accept
      const pro = job.proposals.find((value: any, index: number) => {
        return value._id.toString() === propId;
      });
      //get the proposal index
      const index = job.proposals.indexOf((p: any) => p._id === propId);
      //update the proposal
      pro.accepted = true;
      //update the skilled worker for the job
      job.swId = swId;
      //get skilled worker and update isOnAJob
      await SWExtra.findOneAndUpdate({ userId: swId }, { onAJob: true });
      //update the job that the proposal has been accepted
      job.proposalAccepted = true;
      //update the job proposals
      job.proposals[index] = pro;
      await job.save();

      //send notification to skilled worker
       await Notification.create({
        message:'Your proposal has been accepted. Check your current job page',
        title:'Proposal accepted',toUserId:swId
      })
      res
        .status(201)
        .json({
          accepted:
            pro.accepted &&
            job.proposalAccepted &&
            job.swId.toString() === swId,
          message: "Proposal accepted",
        });
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
