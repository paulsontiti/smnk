import dbConnect from '../../../lib/mongoose'
import IndividualPersonalInfo from '../../../lib/model/individualPersonalInfo'
import User from '@/lib/model/userModel'
import CompanyProfile from '@/lib/model/companyInfo'

export default async function handler(req:any,res:any){
    await dbConnect()

        const {query:{userId}} = req
        if(userId){
                try{
                    const user = await User.findById(userId)
                 if(user){
                    if(user.typeClass === 'individual'){
                        const profile = await IndividualPersonalInfo.findOne({userId})
                        res.status(201).json(profile)
                    }else{
                        const profile = await CompanyProfile.findOne({userId})
                        res.status(201).json(profile)
                    }
                    
                 }else{
                    res.status(201).json(null)
                 }
                }catch(err:any){
                    res.status(400).json({message:err.message})
                }
        
        }else{
            res.status(400).json({message:"Invalid request"})
        }
       
    
    
    
}