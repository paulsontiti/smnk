import axios from "axios"

export const suspendRestoreUser = async(userId:string,active:boolean)=>{
    
        try{
            const res = await axios({
                  method:'POST',
                  url:`${process.env.SMNK_URL}api/a-dashboard/suspend-restore-user`,
                  data:{userId,active}
              })
            const data = await res.data
           return data
            
        }catch(err:any){
          console.log(err)
          return err
        }
     
  }