import dbConnect from '../../../lib/mongoose'
import IndividualPersonalInfo from '../../../lib/model/individualPersonalInfo'
import CompanyProfile from '@/lib/model/companyInfo'

export default async function handler(req:any,res:any){
    await dbConnect()
    
        const {name,state,lga,userId,officeAddress,description} = req.body
        
        if(name && state && lga && userId && officeAddress && description){
            try{
                 const profile = await CompanyProfile.create(req.body)
                 if(profile){
                     res.status(201).json({successful:true,message:"Your Company Profile was successfully added"})
                }else{
                    res.status(400).json({successful:false,message:"Sorry an error occurred,please try again"})
                }
                    
               
            }catch(err:any){
                console.log(err)
                res.status(400).json({successful:false,message:"Sorry an error occurred,please try again"})
            }
        
        }else{
            res.status(400).json({successful:false,message:"Incomplete company profile info"})
        }    
    
}