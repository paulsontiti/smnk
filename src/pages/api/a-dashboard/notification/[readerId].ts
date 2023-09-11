import Notification from "@/lib/model/notification";
import dbConnect from "../../../../lib/mongoose";

export default async function handler(req: any, res: any) {
  const { readerId } = req.query;

  await dbConnect();

  try {
    const notifications = await Notification.find();
    const filtered = notifications.map((notification) => {
      if (notification.toUserId) {
        //check if this notification is for the reader
        if (notification.toUserId.toString() === readerId && notification.readByUser === false) {
          return notification;
        }
      } else {
        //check if no one has read the notification
        if (notification.usersId.length === 0) {
          return notification;
        }

        //check if the reader has not read the notification
        const not = notification.usersId.find(
          (userId: any) => userId.toString() === readerId
        );
        if (!not) return notification;
      }
    });
    res.status(201).json(filtered.filter((not) => not !== undefined));
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ message: "Server Error" });
  }
}
