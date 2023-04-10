import SMNKBankDetails from '@/components/payment/smnkBankDetais'
import FormikContainer from '@/components/form/formikContainer'
import {FormControls, FormParams, createFormObject } from '@/lib/form'
import {JobPaymentDetails, paymentSchema, jobPaymentSubmitHandler, } from '@/lib/payment'
import { useRouter } from 'next/router'
import React from 'react'


function TransferForJobPaymentForm({jobId,userId}:{jobId:string,userId:string}) {

  const router = useRouter()

const initialValues: JobPaymentDetails ={
  accountName:'',
  bankName:'',
  amountPaid:0,
  userId,
  jobId,
  dop: null,
  confirm:false
}
const formikSubmitHandler = (values:JobPaymentDetails,formikHelpers:any)=>{
  //console.log(values)
  return new Promise(res=>{
      formikHelpers.validateForm().then(async (data:any)=>{
          const msg = await jobPaymentSubmitHandler(values,router)
          res(msg)
      }).catch((err:any)=>{
          res(err)
      })              
  })

}

    const formControls:FormControls[]  = [
        {name:'bankName',label:'Bank',control:'input'},
        {name:'accountName',label:'Bank Account Name',control:'input'},
        {name:'amountPaid',label:'Amount Paid',control:'input',type:'number'},
        {name:'dop',label:'Date Of Payment',control:'date'},
        //{name:'pop',label:'Please Upload Proof Of Payment',control:'file',type:'file'},
    ]

    
const formParams:FormParams ={
  formObject : createFormObject(formikSubmitHandler,paymentSchema,initialValues,formControls),
  buttonLabel:'Submit Transfer Details',
  headerTitle:'Provide Transfer Details'
}
  return (
    <>
        <SMNKBankDetails/>
        
        <FormikContainer formParams={formParams}/>
    </>
    
  )
}

export default TransferForJobPaymentForm