import User from "@/lib/model/userModel"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {userId,subscribedDate,expiringDate} = req.body
    if(userId && subscribedDate && expiringDate){
        
        try{
            const user = await User.findOne({_id:userId})
           
            if(user){
                const subscription = user.subscription
                const sub = {...subscription,popConfirmed:true,subscribedDate,expiringDate}
                user.subscription = sub
                const newUser = await user.save()
               
                res.status(201).json(newUser.subscription.popConfirmed)

            }
            
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
        
    }else{
        res.status(400).json({message:"Invalid request. Please provide the required details"})
    }
    
    
}