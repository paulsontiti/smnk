import React from 'react'
import FormikContainer from '../form/formikContainer'
import {FormControls, FormParams, createFormObject } from '@/lib/form'
import { object, string } from 'yup'
import {useRouter} from 'next/router'
import { Correction, correctionSubmitHandler } from '@/lib/correction'
import { Complaint, complaintSubmitHandler } from '@/lib/complaint'


function ComplaintForm({jobId,senderId,url}:{jobId:string,senderId:string,url:string}) {
    
    const router = useRouter()
     //formik submit handler
  const formikSubmitHandler = (values:any,formikHelpers:any)=>{
   
    return new Promise(res=>{
     
          formikHelpers.validateForm().then(async (data:any)=>{
               complaintSubmitHandler(values,router,url)
              res(data)
          }).catch((err:any)=>{
            console.log('Error from formik ',err)
            res(err)
          })    
         
    })


}

const initialValues:Complaint = {complaint:'',subject:'',jobId,read:false,seen:false}
const validationSchema = object({
    complaint:string().required('Correction is required'),
  subject:string().required('Subject is required'),
})

    const complaintFormControls:FormControls[] = [
          {name:'subject',label:'Subject',control:'input'},
          {name:'complaint',label:'Complaint',control:'textarea'}
        ]

        const formParams:FormParams ={
          formObject : createFormObject(formikSubmitHandler,validationSchema,initialValues,complaintFormControls),
          buttonLabel:'Submit',
          headerTitle: `What's wrong`
        }
        
  return (
    <FormikContainer formParams={formParams} />
  )
}

export default ComplaintForm