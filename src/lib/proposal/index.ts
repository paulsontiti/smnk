import axios from "axios"

export const getProposalsByUserId = (id:string)=>{
    const res = async ()=>{
        try{
            if(id){
                const res = await axios({
                    method:'GET',
                    url:`${process.env.SMNK_URL}api/users/proposal/users/${id}`,
                })
                const data = await res.data
            //console.log(data)
          return data
          }else{
            console.log('Invalid request')
          }
            
            
        }catch(err:any){
          console.log(err)
          return err
        }
       }
    return res
  }

  export const getProposalsByJobId = (id:string)=>{

    const res = async ()=>{
        try{
            if(id){
                const res = await axios({
                    method:'GET',
                    url:`${process.env.SMNK_URL}api/users/proposal/jobs/${id}`,
                })
                const data = await res.data
            //console.log(data)
          return data
          }else{
            console.log('Invalid request')
          }
            
            
        }catch(err:any){
          console.log(err)
          return err
        }
       }
    return res
  }

  export const hasAppliedForJob = (jobId:string,userId:string)=>{

    const res = async ()=>{
        try{
            if(jobId && userId){
                const res = await axios({
                    method:'POST',
                    url:`${process.env.SMNK_URL}api/users/proposal/jobs/has-applied`,
                    data:{jobId,userId}
                })
                const data = await res.data
            //console.log(data)
          return data
          }else{
            console.log('Invalid request')
          }
            
            
        }catch(err:any){
          console.log(err)
          return err
        }
       }
    return res
  }
  
  export const acceptProposal = async(propId:string,swId:string,jobId:string)=>{
    
          try{
                if(propId){
                        const res = await axios({
                            method:'POST',
                            url:`${process.env.SMNK_URL}api/users/proposal/jobs/accept`,
                            data:{propId,swId,jobId}
                        })
                        const data = await res.data
                        
                  return data
                  }else{
                    console.log('Invalid request')
                  }
                    
                
          }catch(err:any){
            console.log(err)
            return err
          }
  }
  export const rejectProposal = async(propId:string,jobId:string)=>{
    
    try{
          if(propId){
                  const res = await axios({
                      method:'POST',
                      url:`${process.env.SMNK_URL}api/users/proposal/jobs/reject`,
                      data:{propId,jobId}
                  })
                  const data = await res.data
                  
            return data
            }else{
              console.log('Invalid request')
            }
              
          
    }catch(err:any){
      console.log(err)
      return err
    }
}

  export const isProposalAcceptedForJob = async(jobId:string)=>{
    
        try{
            if(jobId){
                const res = await axios({
                    method:'POST',
                    url:`${process.env.SMNK_URL}api/users/proposal/jobs/is-proposal-accepted-for-job`,
                    data:{jobId}
                })
                const data = await res.data
            
          return data
          }else{
            console.log('Invalid request')
          }
            
            
        }catch(err:any){
          console.log(err)
          return err
        }
  }
  export const isJobPaidFor = async(jobId:string)=>{
    
    try{
        if(jobId){
            const res = await axios({
                method:'POST',
                url:`${process.env.SMNK_URL}api/users/proposal/jobs/is-job-paid-for`,
                data:{jobId}
            })
            const data = await res.data
        
      return data
      }else{
        console.log('Invalid request')
      }
        
        
    }catch(err:any){
      console.log(err)
      return err
    }
}
export const isJobApproved = async(jobId:string)=>{
    
  try{
      if(jobId){
          const res = await axios({
              method:'POST',
              url:`${process.env.SMNK_URL}api/job/is-job-approved`,
              data:{jobId}
          })
          const data = await res.data
      
    return data
    }else{
      console.log('Invalid request')
    }
      
      
  }catch(err:any){
    console.log(err)
    return err
  }
}
export const isJobRated = async(jobId:string)=>{
    
  try{
      if(jobId){
          const res = await axios({
              method:'POST',
              url:`${process.env.SMNK_URL}api/rating/is-job-rated`,
              data:{jobId}
          })
          const data = await res.data
      
    return data
    }else{
      console.log('Invalid request')
    }
      
      
  }catch(err:any){
    console.log(err)
    return err
  }
}