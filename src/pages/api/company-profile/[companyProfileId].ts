import dbConnect from '../../../lib/mongoose'
import IndividualPersonalInfo from '../../../lib/model/individualPersonalInfo'
import CompanyProfile from '@/lib/model/companyInfo'

export default async function handler(req:any,res:any){
    await dbConnect()

        const {query:{companyProfileId}} = req
        //console.log(companyProfileId)
        if(companyProfileId !== undefined){
                try{
                    const profile = await CompanyProfile.findOne({userId:companyProfileId})
                    
                    res.status(201).json(profile)
                }catch(err:any){
                    //console.log(err)
                    res.status(400).json({message:err.message})
                }
        
        }else{
            res.status(400).json({message:"Invalid request"})
        }
       
    
    
    
}