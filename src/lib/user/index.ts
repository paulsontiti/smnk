import axios from "axios"

export const getUser = async(userId:string)=>{
   
  try{
      if(userId){
          const res = await axios({
              method:'POST',
              url:`${process.env.SMNK_URL}api/users/userinfo`,
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
export const getUserSub = async(userId:string)=>{
    
    try{
        if(userId){
            const res = await axios({
                method:'POST',
                url:`${process.env.SMNK_URL}api/users/sub`,
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