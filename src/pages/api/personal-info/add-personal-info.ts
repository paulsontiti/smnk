import dbConnect from '../../../lib/mongoose'
import IndividualPersonalInfo from '../../../lib/model/individualPersonalInfo'

export default async function handler(req:any,res:any){
    await dbConnect()

        const {firstName,lastName,userName,address,description} = req.body
        
        if(firstName && lastName && userName && address && description){
            try{
                const existingInfoWithUsername = await IndividualPersonalInfo.findOne({userName:userName})
                if(existingInfoWithUsername){
                    res.status(400).json({message:"An account already exist with the username,please choose anothe user name"})
                }else{
                        const info = await IndividualPersonalInfo.create(req.body)
                        res.status(201).json({message:"Your Personal Info was successfully added",info})
                    }
                   
            
            }catch(err:any){
                console.log(err)
                res.status(400).json({message:"Sorry an error occurred,please try again"})
            }
        
        }else{
            res.status(400).json({message:"Incomplete personal info"})
        }   
    
}