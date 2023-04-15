import Job from '@/lib/model/job'
import dbConnect from '../../../../lib/mongoose'

import IndividualPersonalInfo from '@/lib/model/individualPersonalInfo'
import User from '@/lib/model/userModel'
import { JobDetails } from '@/lib/job'
import Service from '@/lib/model/service'
import CompanyProfile from '@/lib/model/companyInfo'

export default async function handler(req:any,res:any){
    await dbConnect()

      const {_id} = req.body
      if(_id){
          const user = await User.findOne({_id})

          if(user.typeClass === 'individual'){
                try{
                    const info = await IndividualPersonalInfo.findOne({userId:_id})
                    const serv = await Service.findOne({userId:_id})

                    const jobs:JobDetails[][]  = [[]]

                    if(info){
                        const jobsByLocation = await Job.find({state:info.state,approved:false,proposalAccepted:false})
                        jobs.push(jobsByLocation)
                    }
                    if(serv){
                        const jobsByService = await Job.find({category:serv.category,approved:false,proposalAccepted:false})
                        jobs.push(jobsByService)
                        // const jobsByTitle = await Job.find({title:serv.title,approved:false})
                        // jobs.push(jobsByTitle)
                    }
                    
                    res.status(201).json(jobs)
                }catch(err:any){
                    console.log(err)
                    res.status(400).json({message:"Server Error"})
                }
            }else{
                try{
                    const info = await CompanyProfile.findOne({userId:_id})
                    const serv = await Service.findOne({userId:_id})
                    
                    const jobs:JobDetails[][]  = []
                    
                    if(info){
                        const jobsByLocation = await Job.find({state:info.state,approved:false,proposalAccepted:false})
                        jobs.push(jobsByLocation)
                    }
                    if(serv){
                        const jobsByService = await Job.find({category:serv.category,approved:false,proposalAccepted:false})
                        jobs.push(jobsByService)
                        // const jobsByTitle = await Job.find({title:serv.title})
                        // jobs.push(jobsByTitle)
                    }
                    
                        res.status(201).json(jobs)
                    }catch(err:any){
                        console.log(err)
                        res.status(400).json({message:"Server Error"})
                    }
            }
                
        
        }else{
            res.status(400).json({message:'Invalid request'})
        }
       
    
    
    
}