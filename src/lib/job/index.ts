
import axios from "axios"

export type JobDetails ={
    title:string
    type:string
    category:string
    userId:string
    startDate:Date
    endDate:Date
    description:string
    budget:number
    agreeToTerms:boolean
    state?:string
    lga?:string
    address?:string
}


export const deleteJob = async (jobId:string)=>{
    
    try{
        if(jobId){
                const res = await axios({
                    method:'POST',
                    url:`${process.env.SMNK_URL}api/job/delete`,
                    data:{jobId}
                })
                const data = await res.data
               return data
          }else{
            console.log('Invalid request')
          }
            
        
  }catch(err:any){
    console.log(err)
    return false
  }
  }