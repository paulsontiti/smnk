import SWExtra from "@/lib/model/swExtra";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();
  const {
    body: { service },
  } = req;

  try {
    const swExtras = await SWExtra.find(
      {
        $or:[{'services.title':service},{'services.category':service}]
      },
      {
       userId:true,
        experience: true,
        services: true,
        subscription: true,
      }
    );
    
    res.status(201).json(swExtras);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "Sorry an error occurred,please try again" });
  }
}
