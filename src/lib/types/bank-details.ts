import {number, object,string} from 'yup'
import { NextRouter } from 'next/dist/client/router'
import axios from 'axios'
import { FormControls } from '../form'


export type BankDetails ={
    accounName:string,
   
    accountNumber:string,
    bankName:string,
    userId:string
  }

  export const bankDetailsSubmitHandler = async (values:BankDetails,router:NextRouter,url:string)=>{
 
    try{
            const res = await axios({
                    method:'POST',
                    url:`${process.env.SMNK_URL}${url}`,
                    data:values
                })
            const data = await res.data
           
            alert(data.message)
                      if(data.successful){
                        router.push('/sw-dashboard/bank-details')
                      }
    
    }catch(err:any){
        console.log(err)
        alert(err.response.data.message)
    }
  
}

export const bankDetailsSchema = object({
    accountName: string().required('Account Name is required'),
    accountNumber: string().min(10,'Account Number can not be less than 10 numbers')
                            .max(10,'Account Number can not be more than 10 numbers')
                            .required('Account Number is required'),
    bankName: string().required('Bank Name is required'),
})

export const bankDetailsFormControls:FormControls[] = [
    {name:'accountName',label:'Account Name',control:'input'},
    {name:'accountNumber',label:'Account Number',control:'input'},
    {name:'bankName',label:'Bank Name',control:'input'},
  ]