import { NextApiResponse } from "next";
import { multerHandler, multerUpload } from "@/lib/multer";
import dbConnect from "@/lib/mongoose";
import methodOverride from "method-override";
import mongoose from "mongoose";
import Grid from "gridfs-stream";
import SWExtra from "@/lib/model/swExtra";
import User from "@/lib/model/userModel";

export const config = {
  api: {
    bodyParser: false,
  },
};

multerHandler
  .use(methodOverride("_method"))
  .use(multerUpload().single("idCard"))
  .post(async (req: any, res: NextApiResponse) => {
    //connect to database and get database and connection objects
    const dbAndConnection = await dbConnect();
    //init gfs
    let gfs;

    //create collection for profile pics uploads
    dbAndConnection?.connection.once("open", () => {
      //init stream
      gfs = Grid(dbAndConnection.db, mongoose.mongo);
      gfs.collection("dps");
    });

    const { userId } = req.body;
    const { filename } = req.file;
    if (userId) {
      try {
        const user = await User.findById(userId);
        if (user) {
          user.verification = { ...user.verification, idCardUrl: filename };
          const newUser = await user.save();
          if (newUser) {
            res.status(201).json(filename);
          } else {
            res.status(400).json(null);
          }
        }
      } catch (err) {
        console.log(err);
        res.status(400).json(null);
      }
    } else {
      res.status(400).json(null);
    }
  });

export default multerHandler;
