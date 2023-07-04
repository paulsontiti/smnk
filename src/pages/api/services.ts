import Job from "@/lib/model/job";
import SWExtra from "@/lib/model/swExtra";
import User from "@/lib/model/userModel";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();


  try {
    //get all the services 
    const swExtras = await SWExtra.find(
     {},{services:true,_id:false}
    );
    //loop through and get the number of services
    let servicesCount = 0
     swExtras.map((extra)=>{
        extra.services.map((serv:any)=>{
            servicesCount++
        })
    })
//get the number of jobs
const jobsCount = await Job.count()
//get the number of professionals
const profCount = await User.count({type:'skilled worker'})
//get the number of clients
const clientCount = await User.count({type:'client'})
    res.status(201).json({servicesCount,jobsCount,profCount,clientCount});
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "Sorry an error occurred,please try again" });
  }
}
