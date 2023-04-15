import axios from "axios"

export const getAllClients = ()=>{
    const res = async ()=>{
        try{
            const res = await axios({
                  method:'GET',
                  url:`${process.env.SMNK_URL}api/clients`
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