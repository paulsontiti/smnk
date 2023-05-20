
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
  export const cancelJob = async (jobId:string)=>{
    
    try{
        if(jobId){
                const res = await axios({
                    method:'POST',
                    url:`${process.env.SMNK_URL}api/job/cancel`,
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
  export const getJobDetails = async (
    jobId: string,
    setDetails: React.Dispatch<React.SetStateAction<any>>,
    setError: React.Dispatch<React.SetStateAction<any>>,
  ) => {
    try {
      if (jobId) {
        const res = await axios({
          method: "GET",
          url: `${process.env.SMNK_URL}api/job/${jobId}`,
        });
        const data = await res.data;
        //console.log(data)
        setDetails(data);
      } else {
        console.log("Invalid request");
      }
    } catch (err: any) {
      console.log(err);
      setError(err);
    }
  };