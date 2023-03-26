import dbConnect from '../../../lib/mongoose'
import IndividualPersonalInfo from '../../../lib/model/individualPersonalInfo'

export default async function handler(req:any,res:any){
    await dbConnect()

        const {query:{userIdForInfo}} = req
        
        if(userIdForInfo){
                try{
                    const info = await IndividualPersonalInfo.findOne({userId:userIdForInfo})
                    //console.log(info)
                    res.status(201).json(info)
                }catch(err:any){
                    res.status(400).json({message:err.message})
                }
        
        }else{
            res.status(400).json({message:"Invalid request"})
        }
       
    
    
    
}