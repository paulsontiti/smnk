import SMNKBankDetails from '@/components/payment/smnkBankDetais'
import FormikContainer from '@/components/form/formikContainer'
import {FormParams, createFormObject } from '@/lib/form'
import {UpgradePaymentDetails, paymentFormControls, paymentSchema, upgradePaymentSubmitHandler } from '@/lib/payment'
import { useRouter } from 'next/router'
import React from 'react'


function TransferForUpgradePaymentForm({packageName,userId}:{packageName:string,userId:string}) {

  const router = useRouter()

const initialValues: UpgradePaymentDetails ={
  accountName:'',
  bankName:'',
  amountPaid:0,
  userId,
  packageName,
  dop: null,
  confirm:false
}
const formikSubmitHandler = (values:UpgradePaymentDetails,formikHelpers:any)=>{
  //console.log(values)
  return new Promise(res=>{
      formikHelpers.validateForm().then(async (data:any)=>{
          const msg = await upgradePaymentSubmitHandler(values,router)
          res(msg)
      }).catch((err:any)=>{
          res(err)
      })              
  })

}

   

    
const formParams:FormParams ={
  formObject : createFormObject(formikSubmitHandler,paymentSchema,initialValues,paymentFormControls),
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

export default TransferForUpgradePaymentForm