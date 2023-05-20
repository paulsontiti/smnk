import React from 'react'
import FormikContainer from '../form/formikContainer'
import {FormControls, FormParams, createFormObject } from '@/lib/form'
import { object, string } from 'yup'
import {useRouter} from 'next/router'
import { ReportDetails, reportSubmitHandler } from '@/lib/report'


function JobReportForm({jobId,url}:{jobId:string,url:string}) {
    
    const router = useRouter()
     //formik submit handler
  const formikSubmitHandler = (values:any,formikHelpers:any)=>{
    const formData = new FormData()
    
    formData.append('reportFile',values.reportFile) 
    formData.append('report',values.report) 
    formData.append('subject',values.subject) 
    formData.append('jobId',values.jobId) 
    

    return new Promise(res=>{
     
          formikHelpers.validateForm().then(async (data:any)=>{
               reportSubmitHandler(formData,router,url)
              res(data)
          }).catch((err:any)=>{
            console.log('Error from formik ',err)
            res(err)
          })    
         
    })


}

const initialValues:ReportDetails = {report:'',subject:'',jobId,reportFile:null}
const validationSchema = object({
  report:string().required('Report is required'),
  subject:string().required('Subject is required'),
})

    const reportFormControls:FormControls[] = [
          {name:'subject',label:'Subject',control:'input'},
          {name:'report',label:'Report',control:'textarea'},
          {name:'reportFile',label:'Attatch a file',control:'file',initiaValues:initialValues}
        ]

        const formParams:FormParams ={
          formObject : createFormObject(formikSubmitHandler,validationSchema,initialValues,reportFormControls),
          buttonLabel:'Send',
          headerTitle: `What's Your Report`
        }
        
  return (
    <FormikContainer formParams={formParams} />
  )
}

export default JobReportForm