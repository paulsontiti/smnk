import dbConnect from '../../../lib/mongoose'
import CompanyProfile from '@/lib/model/companyInfo'

export default async function handler(req:any,res:any){

    await dbConnect()

    const {name,email,state,lga,userId,officeAddress,description} = req.body
        
    if(name && email && state && lga && userId && officeAddress && description){
        try{
                                          
            const deleted = await CompanyProfile.deleteOne({userId:userId})
            
            if(deleted.acknowledged){
                const profile = await CompanyProfile.create(req.body)
                res.status(201).json({profileEdited:true,message:"Your Company profile was successfully edited",profile})              
        
            }
        }catch(err:any){
            console.log(err)
            res.status(400).json({profileEdited:false,message:'something went wrong, please try again'})
        }
    
    }else{
        res.status(400).json({profileEdited:false,message:"Incomplete profile info"})
    }    
}