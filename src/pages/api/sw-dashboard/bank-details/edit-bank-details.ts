
import User from '@/lib/model/userModel'
import dbConnect from '../../../../lib/mongoose'



export default async function handler(req:any,res:any){

    const {bankDetails,_id} = req.body

    if(_id){
        try{
            await dbConnect()
            const user = await User.findByIdAndUpdate(_id,{bankDetails},{new:true})
            if(user){
                res.status(201).json({successful:true,
                    message:"Your Bank Details  was successfully edited"})
            }else{
                res.status(400).json({successful:false,message:"Unable to edit your bank details"})
            }
        }catch(err){
            console.log(err)
            res.status(400).json({successful:false,message:"oopps!! Something went wrong,please try again"})
        }
    }else{
        res.status(400).json({successful:false,message:"Incomplete info"})
    }
    
     
    
}