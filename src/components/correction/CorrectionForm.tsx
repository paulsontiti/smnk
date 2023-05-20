import React from 'react'
import FormikContainer from '../form/formikContainer'
import {FormControls, FormParams, createFormObject } from '@/lib/form'
import { object, string } from 'yup'
import {useRouter} from 'next/router'
import { Correction, correctionSubmitHandler } from '@/lib/correction'


function CorrectionForm({jobId,reportId,url}:{jobId:string,reportId:string,url:string}) {
    const router = useRouter()
     //formik submit handler
  const formikSubmitHandler = (values:any,formikHelpers:any)=>{
    return new Promise(res=>{
     
          formikHelpers.validateForm().then(async (data:any)=>{
               correctionSubmitHandler(values,router,url)
              res(data)
          }).catch((err:any)=>{
            console.log('Error from formik ',err)
            res(err)
          })    
         
    })


}

const initialValues:Correction = {correction:'',subject:'',reportId,jobId,read:false,seen:false}
const validationSchema = object({
    correction:string().required('Correction is required'),
  subject:string().required('Subject is required'),
})

    const correctionFormControls:FormControls[] = [
          {name:'subject',label:'Subject',control:'input'},
          {name:'correction',label:'Correction',control:'textarea'}
        ]

        const formParams:FormParams ={
          formObject : createFormObject(formikSubmitHandler,validationSchema,initialValues,correctionFormControls),
          buttonLabel:'Send',
          headerTitle: `What's wrong`
        }
        
  return (
    <FormikContainer formParams={formParams} />
  )
}

export default CorrectionForm