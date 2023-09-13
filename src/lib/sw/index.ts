import axios from "axios"

export const getAllSkilledWorkers = ()=>{
    const res = async ()=>{
        try{
            const res = await axios({
                  method:'GET',
                  url:`${process.env.SMNK_URL}api/sw`
              })
            const data = await res.data
           return data
            
        }catch(err:any){
          getAllSkilledWorkers()
          //return err
        }
       }
    return res
  }
  export const getAdmins = ()=>{
    const res = async ()=>{
        try{
            const res = await axios({
                  method:'GET',
                  url:`${process.env.SMNK_URL}api/a-dashboard/admins`
              })
            const data = await res.data
           return data
            
        }catch(err:any){
          getAllSkilledWorkers()
          //return err
        }
       }
    return res
  }
  export const getSWSub = (userId:string)=>{
    const res = async ()=>{
        try{
          if(userId){
            const res = await axios({
                method:'POST',
                url:`${process.env.SMNK_URL}api/sw/sub`,
                data:{userId}
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
    return res
  }