import dbConnect from '../../../../lib/mongoose'
import Experience from '@/lib/model/experience'

export default async function handler(req:any,res:any){
    await dbConnect()
        const {title,company,city,state,lga,address,startMonth
            ,startYear,userId,onRole,description} = req.body

            if(onRole){
                if(title && company && city && state && lga && address &&startMonth
                    && startYear && userId && description){
                    try{
                        const exp = await Experience.create(req.body)
                        res.status(201).json({isExpAdded:true,
                                message:"Your Experience Info was successfully added"})
                    
                        }catch(err:any){
                            res.status(400).json({isExpAdded:false,message:err.message})
                        }
                
                }else{
                    res.status(400).json({isInfoAdded:false,message:"Incomplete experience details. Please provide all required fields"})
                }
            }else{
                const {endMonth,endYear} = req.body
                if(endMonth && endYear){
                    if(title && company && city && state && lga && address &&startMonth
                        && startYear && userId && description){
                        try{
                            const exp = await Experience.create(req.body)
                            res.status(201).json({isExpAdded:true,
                                    message:"Your Experience Info was successfully added"})
                        
                            }catch(err:any){
                                res.status(400).json({isExpAdded:false,message:err.message})
                            }
                    
                    }else{
                        res.status(400).json({isExpAdded:false,message:"Incomplete experience details. Please provide all required fields"})
                    }
                }else{
                    res.status(400).json({isExpAdded:false,
                        message:"Please provide End Date details since you are not currently on this role"})
                }
                
            } 
    
    
    
}