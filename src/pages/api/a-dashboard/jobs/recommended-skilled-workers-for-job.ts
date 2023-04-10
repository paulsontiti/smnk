import Job from '@/lib/model/job'
import dbConnect from '../../../../lib/mongoose'

import IndividualPersonalInfo from '@/lib/model/individualPersonalInfo'
import CompanyProfile from '@/lib/model/companyInfo'
import User from '@/lib/model/userModel'
import Service from '@/lib/model/service'

export default async function handler(req:any,res:any){
    await dbConnect()

      const {id} = req.body
        //console.log(id)
        if(id){
                try{
                    const job = await Job.findOne({_id:id})
                    
                    if(job){
                        const individualInfos = await IndividualPersonalInfo.find({lga:job.lga})

                        if(individualInfos){
                             individualInfos.map(async (info)=>{
                            //    infos.push(info)
                                const user = await User.findOne({_id:info.userId})
                                const serv = await Service.findOne({userId:user._id})
                                res.status(201).json({info,user,serv})
                            })
                        }else{
                            res.status(201).json({messsage:'No Data'})
                        }
                        //const CompanySkilledWorkers = await CompanyProfile.find({lga:job.lga})
                    }else{
                        res.status(201).json({message:'No Job found'})
                    }
                    
                }catch(err:any){
                    console.log(err)
                    res.status(400).json({message:"Server Error"})
                }
        
        }else{
            res.status(400).json({message:'Invalid request'})
        }
       
    
    
    
}