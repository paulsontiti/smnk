import axios from "axios"

export type Complaint={
  _id?:string,
  subject:string,
  complaint:string,
  senderId:string,
  jobId:string,
  seen:boolean,
  read:boolean
}
  //complaint submit handler
  export const complaintSubmitHandler = async (values:Complaint,router:any,url:string)=>{
    
    try{
        if(values.senderId && values.jobId){
                const res = await axios({
                    method:'POST',
                    url:`${process.env.SMNK_URL}api/complaint/make-complaint`,
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

export const getAllComplaints = ()=>{
    const res = async ()=>{
        try{
            const res = await axios({
                  method:'GET',
                  url:`${process.env.SMNK_URL}api/complaint`
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

// export const unreadMessagesCount = async (receiverId:string)=>{
    
//   try{
//       if(receiverId){
//               const res = await axios({
//                   method:'GET',
//                   url:`${process.env.SMNK_URL}api/message/${receiverId}`,
//               })
//               const data = await res.data
//              return data
//         }else{
//           console.log('Invalid request')
//         }
          
      
// }catch(err:any){
//   console.log(err)
//   return err
// }
// }
// export const allMessages = async (receiverId:string)=>{
  
//   try{
//       if(receiverId){
//               const res = await axios({
//                   method:'POST',
//                   url:`${process.env.SMNK_URL}api/message/all-messages`,
//                   data:{receiverId}
//               })
//               const data = await res.data
//              return data
//         }else{
//           console.log('Invalid request')
//         }
          
      
// }catch(err:any){
//   console.log(err)
//   return err
// }
// }
