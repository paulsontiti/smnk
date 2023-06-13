import axios from "axios"

export type Complaint={
  _id?:string,
  subject:string,
  complaint:string,
  jobId:string,
  seen:boolean,
  read:boolean
}


export const getAllComplaints = async(jobId:string)=>{
  let data
  let error
   if(jobId){
      try{
        const res = await axios({
              method:'GET',
              url:`${process.env.SMNK_URL}api/complaint/${jobId}`
          })
         data = await res.data
        
    }catch(err:any){
      console.log(err)
      error =  err
    }
   }
        return {data,error}
  }
