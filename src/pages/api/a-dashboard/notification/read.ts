import Notification from "@/lib/model/notification";
import dbConnect from "../../../../lib/mongoose";

export default async function handler(req: any, res: any) {
  const { notIds, userId } = req.body;
  await dbConnect();

  try {
    const notifications = await Notification.find();
    notifications.map(async(notification) => {
      
      //check if this notification is for just one user
      if (notification.toUserId) {
        notification.readByUser = true;
        await notification.save();
      } else {
        Array.isArray(notIds) &&
          notIds.map(async (id) => {
            if (notification._id.toString() === id) {
              if (Array.isArray(notification.usersId)) {
                notification.usersId.push(userId);
                await notification.save();
              } else {
                notification.usersId = [];
                notification.usersId.push(userId);
                await notification.save();
              }
            }
          });
      }
    });
    res.status(201).json("");
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ message: "Server Error" });
  }
}
