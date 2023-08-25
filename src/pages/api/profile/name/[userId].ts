import IndividualPersonalInfo from '@/lib/model/individualPersonalInfo'
import dbConnect from '../../../../lib/mongoose'
import User from '@/lib/model/userModel'
import CompanyProfile from '@/lib/model/companyInfo'

export default async function handler(req:any,res:any){
    await dbConnect()

        const {query:{userId}} = req
        if(userId){
                try{
                    const user = await User.findById(userId)
                    if(user.typeClass === 'individual'){
                        const profile = await IndividualPersonalInfo.findOne({userId})
                        res.status(201).json(profile.firstName + ' ' + profile.lastName)
                    }else{
                        const profile = await CompanyProfile.findOne({userId})
                        res.status(201).json(profile.name)
                    }
                    
                }catch(err:any){
                    res.status(400).json({message:err.message})
                }
        
        }else{
            res.status(400).json({message:"Invalid request"})
        }
       
    
    
    
}