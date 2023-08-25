import Job from "@/lib/model/job";
import Rating from "@/lib/model/rating";
import UserExtra from "@/lib/model/userExtra";
import dbConnect from "@/lib/mongoose";

//calculates the average user rating
const averageRating = (user: any, swRating: number) => {
  const numerator = user.rating === 1 ? swRating : user.rating + swRating;
  const denominator = user.comments.length === 0 ? 1 : user.comments.length + 1;
  return numerator / denominator;
};
export default async function handler(req: any, res: any) {
  await dbConnect();
  const { values:{aboutSMNK, aboutSW, jobId, raterId, smnkRating, swRating},type } = req.body;

  if (aboutSMNK && aboutSW && jobId && raterId) {
    try {
      const rating = await Rating.create({ aboutSMNK, smnkRating, raterId });
      //update job
      const job = await Job.findById(jobId);
      type === 'skilled worker' ? job.swRated = true : job.clientRated = true;
      await job.save();
      //update user Extra
      const userId = type === 'skilled worker' ? job.userId : job.swId
      const user = await UserExtra.findOne({ userId });
      if (user) {
        user.comments.push({ comment: aboutSW,raterId,date:new Date(),rating:swRating });
        await user.save();
      } else {
        await UserExtra.create({
          userId,
          rating: swRating,
          comments: [{ comment: aboutSW,raterId,date:new Date(),rating:swRating  }],
        });
      }

      if (rating) {
        res
          .status(201)
          .json({
            message: "Thank you for your feedback. Rating well received",
            successful: true,
          });
      } else {
        res
          .status(201)
          .json({
            message: "Sorry an error occurred,please try again",
            successful: false,
          });
      }
    } catch (err: any) {
      console.log(err);
      res
        .status(400)
        .json({
          message: "Sorry an error occurred,please try again",
          successful: false,
        });
    }
  } else {
    res.status(400).json({ message: "Incomplete details", successful: false });
  }
}
