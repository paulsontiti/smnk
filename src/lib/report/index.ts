import axios from "axios"

export type ReportDetails={
  _id?:string,
  subject:string,
  report:string,
  jobId:string
  reportFile:any
}

  //payment submit handler
  export const readReport = async (jobId:string,reportId:string)=>{
    
    try{
                const res = await axios({
                    method:'POST',
                    url:`${process.env.SMNK_URL}api/report/read-report`,
                    data:{jobId,reportId}
                })
               
                
  }catch(err:any){
    console.log(err)
  }
}
//payment submit handler
export const readCorrection = async (jobId:string,reportId:string)=>{
    
  try{
              const res = await axios({
                  method:'POST',
                  url:`${process.env.SMNK_URL}api/report/read-correction`,
                  data:{jobId,reportId}
              })
             
              
}catch(err:any){
  console.log(err)
}
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