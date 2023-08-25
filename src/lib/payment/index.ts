
import axios from 'axios'
import { date, number, object, string } from 'yup'
import { FormControls } from '../form'


  export type PaymentDetails = {
    _id?:string,
    bankName:string,
    accountName:string,
    amountPaid:number,
    dop:Date | null,
    userId:string,
    confirm:boolean
    pop:any
  }

  export interface JobPaymentDetails extends PaymentDetails{
    jobId:string
  }
  export interface UpgradePaymentDetails extends PaymentDetails{
    packageName:string
  }

  export const paymentSchema = object({
    bankName: string().required('Your bank name is required'),
    accountName: string().required('Your bank account name is required'),
    amountPaid: number().required('Amount Paid is required'),
    //dop: date().required('Date of Payment is required'),
  })

  //payment submit handler
export const jobPaymentSubmitHandler = async (values:JobPaymentDetails,router:any)=>{
    try{
        if(values.jobId && values.userId){
                const res = await axios({
                    method:'POST',
                    url:`${process.env.SMNK_URL}api/payment/job/pay-for-job`,
                    data:values
                })
                const data = await res.data
                alert(data.message)
                if(data.successful){
                    router.push('/c-dashboard/job')
                }
          }else{
            console.log('Invalid request')
          }
            
        
  }catch(err:any){
    console.log(err)
    return err
  }
}

  //payment submit handler
  export const upgradePaymentSubmitHandler = async (values:UpgradePaymentDetails,router:any)=>{
    try{
        if(values.packageName && values.userId){
                const res = await axios({
                    method:'POST',
                    url:`${process.env.SMNK_URL}api/payment/upgrade/pay-for-upgrade`,
                    data:values
                })
                const data = await res.data
                alert(data.message)
                if(data.successful){
                    router.push('/sw-dashboard/visibility')
                }
          }else{
            console.log('Invalid request')
          }
            
        
  }catch(err:any){
    console.log(err)
    return err
  }
}

export const getAllPayments = ()=>{
  const res = async ()=>{
      try{
              const res = await axios({
                  method:'GET',
                  url:`${process.env.SMNK_URL}api/payment`,
              })
              const data = await res.data
          //console.log(data)
        return data
      }catch(err:any){
        console.log(err)
        return err
      }
     }
  return res
}

export const confirmJobPayment = async(jobId:string)=>{
    
  try{
      if(jobId){
          const res = await axios({
              method:'POST',
              url:`${process.env.SMNK_URL}api/payment/job/confirm-payment`,
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

export const confirmUpgradePayment = async(userId:string)=>{
    const subscribedDate = new Date()
    const expYear = subscribedDate.getFullYear()
    const expMonth =subscribedDate.getMonth() + 1
    const expDate = subscribedDate.getDate()
    const expiringDate = new Date(expYear,expMonth,expDate)
  try{
      if(userId){
          const res = await axios({
              method:'POST',
              url:`${process.env.SMNK_URL}api/payment/upgrade/confirm-payment`,
              data:{userId,subscribedDate,expiringDate}
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
export const verifyUser = async(userId:string)=>{ 
try{
    if(userId){
        const res = await axios({
            method:'POST',
            url:`${process.env.SMNK_URL}api/a-dashboard/verify-user`,
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
export const paymentFormControls:FormControls[]  = [
  {name:'bankName',label:'Bank Name',control:'input'},
  {name:'accountName',label:'Bank Account Name',control:'input'},
  {name:'amountPaid',label:'Amount Paid',control:'input',type:'number'},
  {name:'dop',label:'Date Of Payment',control:'date'},
  //{name:'pop',label:'Please Upload Proof Of Payment',control:'file',type:'file'},
]

export const confirmPayment = async(jobId:string)=>{
  try{
        if(jobId){
                const res = await axios({
                    method:'POST',
                    url:`${process.env.SMNK_URL}api/job/confirm-payment`,
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

export const confirmSWPaid = async(jobId:string)=>{
    let result = {successful:false,message:''} 
    let error:any = null
  try{
        if(jobId){
                const res = await axios({
                    method:'POST',
                    url:`${process.env.SMNK_URL}api/job/confirm-sw-paid`,
                    data:{jobId}
                })
                const data = await res.data
                
          result = data
          }else{
            console.log('Invalid request')
          }
            
        
  }catch(err:any){
    console.log(err)
   error = err
  }
  return {result,error}
}