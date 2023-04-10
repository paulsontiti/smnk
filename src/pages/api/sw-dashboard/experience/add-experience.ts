import dbConnect from '../../../../lib/mongoose'
import Experience from '@/lib/model/experience'

export default async function handler(req:any,res:any){
    await dbConnect()
        const {title,company,state,lga,address,startDate
            ,userId,onRole,description} = req.body

            if(onRole){
                if(title && company && state && lga && address && startDate &&
                     userId && description){
                    try{
                        const exp = await Experience.create(req.body)
                        res.status(201).json({successful:true,
                                message:"Your Experience Info was successfully added"})
                    
                        }catch(err:any){
                            res.status(400).json({successful:false,message:err.message})
                        }
                
                }else{
                    res.status(400).json({successful:false,message:"Incomplete experience details. Please provide all required fields"})
                }
            }else{
                const {endDate} = req.body
                if(endDate){
                    if(title && company && state && lga && address
                        && startDate && userId && description){
                        try{
                            const exp = await Experience.create(req.body)
                            if(exp){
                                 res.status(201).json({successful:true,
                                message:"Your Experience Info was successfully added"})
                            }
                           
                        
                            }catch(err:any){
                                console.log(err)
                                res.status(400).json({successful:false,message:'Server error , Try again'})
                            }
                    
                    }else{
                        res.status(400).json({successful:false,message:"Incomplete experience details. Please provide all required fields"})
                    }
                }else{
                    res.status(400).json({successful:false,
                        message:"Please provide End Date details since you are not currently on this role"})
                }
                
            } 
    
    
    
}