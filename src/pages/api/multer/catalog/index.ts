import { NextApiResponse } from "next";
import { multerHandler, multerUpload } from "@/lib/multer";
import dbConnect from "@/lib/mongoose";
import methodOverride from "method-override";
import mongoose from "mongoose";
import Grid from "gridfs-stream";
import SWExtra from "@/lib/model/swExtra";

export const config = {
  api: {
    bodyParser: false,
  },
};

multerHandler
  .use(methodOverride("_method"))
  .use(multerUpload().single("cat"))
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
    const { userId, title, description } = req.body;
    const { filename,contentType } = req.file;
    try {
      const extra = await SWExtra.findOne({ userId });
      if (extra) {
        extra.catalog.push({ filename, title, description,contentType });
        await extra.save();
        res
          .status(201)
          .json({
            message: "Your upload was successfully added to your catalog",
            successful: true,
            resData: {filename,contentType},
          });
      } else {
        const extra = await SWExtra.create({
          catalog: [{ filename, title, description,contentType }],
        });
        if (extra) {
          res
            .status(201)
            .json({
              message: "Your upload was successfully added to your catalog",
              successful: true,
              resData: {filename,contentType},
            });
        } else {
          res
            .status(400)
            .json({
              message: "Your upload was not added to your catalog",
              successful: false,
            });
        }
      }
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({
          message: "Your upload was not added to your catalog",
          successful: false,
        });
    }
  });

export default multerHandler;
