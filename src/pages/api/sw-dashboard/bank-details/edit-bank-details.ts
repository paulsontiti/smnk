import dbConnect from "../../../../lib/mongoose";
import SWExtra from "@/lib/model/swExtra";

export const UpdateSWExtra = async(userId:string,key:string,updateParam:any,res:any,nameOfParam:string,resData?:any)=>{
  console.log(userId)
  console.log(key)
  console.log(updateParam)
  console.log(nameOfParam)
    if (userId) {
        try {
          let newSWExtra;
          const swExtra = await SWExtra.findOne({ userId});
          if (swExtra) {
            swExtra[key] = updateParam
           newSWExtra =  await swExtra.save()
            
          } else {
            newSWExtra = await SWExtra.create({ userId, updateParam });
          }
    
          if (newSWExtra) {
            res
              .status(201)
              .json({
                resData:resData,
                successful: true,
                message: `Your ${nameOfParam} Info was successfully added`,
              });
          } else {
            res
              .status(201)
              .json({
                successful: false,
                message: `${nameOfParam} was not added. An Error occurred,try again`,
              });
          }
        } catch (err: any) {
          res.status(400).json(err);
        }
      } else {
        res.status(400).json({ message: "Invalid request" });
      }
}

export default async function handler(req: any, res: any) {
  await dbConnect();
  const { userId, bankDetails } = req.body;
    await UpdateSWExtra(userId,'bankDetails',bankDetails,res,'Bank Details')
 
}
