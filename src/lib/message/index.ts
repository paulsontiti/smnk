import axios from "axios"

export type Message={
  _id?:string,
  subject:string,
  message:string,
  senderId:string,
  receiverId:string
}
  //payment submit handler
  export const messageSubmitHandler = async (values:Message,router:any,url:string)=>{
    
    try{
        if(values.senderId && values.receiverId){
                const res = await axios({
                    method:'POST',
                    url:`${process.env.SMNK_URL}api/message/send`,
                    data:values
                })
                const data = await res.data
                alert(data.message)
                if(data.successful){
                    router.push(url)
                }
          }else{
            console.log('Invalid request')
          }
            
        
  }catch(err:any){
    console.log(err)
    return err
  }
}

export const unreadMessagesCount = async (receiverId:string)=>{
    
  try{
      if(receiverId){
              const res = await axios({
                  method:'GET',
                  url:`${process.env.SMNK_URL}api/message/${receiverId}`,
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
export const allMessages = async (receiverId:string)=>{
  
  try{
      if(receiverId){
              const res = await axios({
                  method:'POST',
                  url:`${process.env.SMNK_URL}api/message/all-messages`,
                  data:{receiverId}
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