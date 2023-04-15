import React from 'react'
import FormikContainer from '../form/formikContainer'
import {FormControls, FormParams, createFormObject } from '@/lib/form'
import { number, object, string } from 'yup'
import {useRouter} from 'next/router'
import { Rating, ratingSubmitHandler } from '@/lib/rating'


function RatingForm({jobId,raterId,url}:{jobId:string,raterId:string,url:string}) {
    
    const router = useRouter()
     //formik submit handler
  const formikSubmitHandler = (values:any,formikHelpers:any)=>{
   
    return new Promise(res=>{
     
          formikHelpers.validateForm().then(async (data:any)=>{
               ratingSubmitHandler(values,router,url)
              res(data)
          }).catch((err:any)=>{
            console.log('Error from formik ',err)
            res(err)
          })    
         
    })


}

const initialValues:Rating = {aboutSMNK:'',aboutSW:'',smnkRating:1,swRating:1,jobId,raterId}
const validationSchema = object({
  aboutSMNK:string().required('This is required'),
  aboutSW:string().required('This is required'),
})

    const messageFormControls:FormControls[] = [
          {name:'aboutSMNK',label:'Say Something about SMNK',control:'textarea'},
          {name:'smnkRating',label:'Rate SMNK',control:'rating'},
          {name:'aboutSW',label:'Say Something About Skilled Worker',control:'textarea'},
          {name:'swRating',label:'Rate Skilled Worker',control:'rating'}
        ]

        const formParams:FormParams ={
          formObject : createFormObject(formikSubmitHandler,validationSchema,initialValues,messageFormControls),
          buttonLabel:'Submit',
          headerTitle: `Please Rate our service`
        }
        
  return (
    <FormikContainer formParams={formParams} />
  )
}

export default RatingForm