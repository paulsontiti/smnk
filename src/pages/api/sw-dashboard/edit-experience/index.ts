import dbConnect from '../../../../lib/mongoose'
import Experience from '@/lib/model/experience'

export default async function handler(req:any,res:any){
    await dbConnect()
        const {title,company,city,state,lga,address,startMonth
            ,startYear,userId,onRole,description,_id} = req.body

        
            if(_id){
                if(onRole){
                    if(title && company && city && state && lga && address &&startMonth
                        && startYear && userId && description){
                        try{
                            const deletedExp = await Experience.deleteOne({_id})
                            console.log('kkkkkkkkkkkkkkkkkkkkkk')
                            console.log(deletedExp)

                            if(deletedExp){
                                const exp = await Experience.create(req.body)
                                res.status(201).json({isExpEdited:true,
                                    message:"Your Experience Info was successfully edited"})
                            }                        
                            }catch(err:any){
                                res.status(400).json({isExpEdited:false,message:err.message})
                            }
                    
                    }else{
                        res.status(400).json({isExpEdited:false,message:"Incomplete experience details. Please provide all required fields"})
                    }
                }else{
                    const {endMonth,endYear} = req.body
                    if(endMonth && endYear){
                        if(title && company && city && state && lga && address &&startMonth
                            && startYear && userId && description){
                            try{
                                const deletedExp = await Experience.deleteOne({_id})
    
                                if(deletedExp){
                                    const exp = await Experience.create(req.body)
                                    res.status(201).json({isExpEdited:true,
                                        message:"Your Experience Info was successfully edited"})
                                }                        
                                }catch(err:any){
                                    res.status(400).json({isExpEdited:false,message:err.message})
                                }
                        
                        }else{
                            res.status(400).json({isExpEdited:false,message:"Incomplete experience details. Please provide all required fields"})
                        }
                    }else{
                        res.status(400).json({isExpEdited:false,
                            message:"Please provide End Date details since you are not currently on this role"})
                    }
                    
                } 
            }else{
                res.status(400).json({isExpEdited:false,message:'Invalid request'})
            }
    
    
    
}