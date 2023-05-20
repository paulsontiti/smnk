import User from '@/lib/model/userModel'
import dbConnect from '../../../../lib/mongoose'


export default async function handler(req:any,res:any){
    await dbConnect()
        const {_id,services} = req.body

        if(_id){
                try{
                    const newUser = await User.findByIdAndUpdate(_id,{services})
                    
                    if(newUser){
                        res.status(201).json({successful:true,
                            message:"Your Service was successfully added"})
                    }else{
                        res.status(201).json({successful:false,
                            message:"Service was not added. An Error occurred,try again"})
                    }
                }catch(err:any){
                    res.status(400).json(err)
                }
        
        }else{
            res.status(400).json({message:"Invalid request"})
        }
       
    
    
}