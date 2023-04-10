import React from 'react'
import FormikContainer from '../form/formikContainer'
import {FormControls, FormParams, createFormObject } from '@/lib/form'
import { object, string } from 'yup'
import {useRouter} from 'next/router'
import { Report, reportSubmitHandler } from '@/lib/report'


function JobReportForm({jobId,senderId,url}:{jobId:string,senderId:string,url:string}) {
    
    const router = useRouter()
     //formik submit handler
  const formikSubmitHandler = (values:any,formikHelpers:any)=>{
   
    return new Promise(res=>{
     
          formikHelpers.validateForm().then(async (data:any)=>{
               reportSubmitHandler(values,router,url)
              res(data)
          }).catch((err:any)=>{
            console.log('Error from formik ',err)
            res(err)
          })    
         
    })


}

const initialValues:Report = {report:'',subject:'',senderId,jobId}
const validationSchema = object({
  report:string().required('Message is required'),
  subject:string().required('Subject is required'),
})

    const reportFormControls:FormControls[] = [
          {name:'subject',label:'Subject',control:'input'},
          {name:'report',label:'Report',control:'textarea'}
        ]

        const formParams:FormParams ={
          formObject : createFormObject(formikSubmitHandler,validationSchema,initialValues,reportFormControls),
          buttonLabel:'Send Report',
          headerTitle: `What's Your Report`
        }
        
  return (
    <FormikContainer formParams={formParams} />
  )
}

export default JobReportForm