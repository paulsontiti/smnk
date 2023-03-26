import useSWR from 'swr'
import axios from 'axios';

export const getUserInfo = (userId:string)=>{
  const res = async ()=>{
    try{
        const res = await axios(`${process.env.SMNK_URL}api/personal-info/${userId}`)
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
   }
  return res
}

  export const getCompanyProfile = (userId:string)=>{
        const res = async ()=>{
            try{
                const res = await axios(`${process.env.SMNK_URL}api/company-profile/${userId}`)
                const data = await res.data
                return data
            }catch(err){
                console.log(err)
                return err
            }
        
      }
      return res
  }

  export const getUserExp = (userId:string)=>{
    const res = async ()=>{
        try{
            const res = await axios({
                  method:'POST',
                  url:`${process.env.SMNK_URL}api/sw-dashboard/experience/${userId}`
              })
            const data = await res.data
           return data
            
        }catch(err:any){
          console.log(err)
          return err
        }
       }
    return res
  }
  
  export const getUserServices = (userId:string)=>{
    const res = async ()=>{
        try{
            const res = await axios({
                  method:'POST',
                  url:`${process.env.SMNK_URL}api/sw-dashboard/service/${userId}`
              })
            const data = await res.data
           return data
            
        }catch(err:any){
          console.log(err)
          return err
        }
       }
    return res
  }
  export const getUserBankDetails = (userId:string)=>{
    const res = async ()=>{
        try{
            const res = await axios({
                  method:'POST',
                  url:`${process.env.SMNK_URL}api/sw-dashboard/bank-details/${userId}`
              })
            const data = await res.data
           return data
            
        }catch(err:any){
          console.log(err)
          return err
        }
       }
    return res
  }



export const userJSON = ()=>{
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        const userStr = localStorage.getItem('user')
        //console.log(userStr)
        if(userStr){
           const user = JSON.parse(JSON.stringify(userStr))
            //console.log(JSON.parse(user))
            return JSON.parse(user)
        }
      }
   }

  export const infoJSON = ()=>{
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        const infoStr = localStorage.getItem('info')
        if(!null){
           const info = JSON.parse(JSON.stringify(infoStr))
            //console.log(JSON.parse(info))
            return JSON.parse(info)
        }
      }
   }
