import FormikContainer from '@/components/form/formikContainer'
import { FormControlObject, FormControls, FormParams, createFormObject } from '@/lib/form'
import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { object, string } from 'yup'

function ApplyJobForm({userId,jobId}:{userId:string,jobId:string}) {
    const router = useRouter()

    const initialValues = {
        content:'',
        userId,
        jobId
    }

    const applyJobSchema = object({
        content: string().required('Proposal is required')
    })

    const submitHandler = async (values:any)=>{
        if(values.jobId && values.userId){
            const res = await axios({
                method:'POST',
                url:`${process.env.SMNK_URL}api/users/proposal/create-proposal`,
                data:values
            })
            const data = await res.data
            
            alert(data.message)

            if(data.successful){
              router.push('/dashboard/job/recommended-jobs')
            }
            
          }else{
            alert('Bad request!!!! No user id')
          } 
    }


     //formik submit handler
  const formikSubmitHandler = (values:any,formikHelpers:any)=>{
   
    return new Promise(res=>{
          formikHelpers.validateForm().then(async (data:any)=>{
               submitHandler(values)
              res(data)
          }).catch((err:any)=>{
            console.log('Error from formik ',err)
            res(err)
          })       
    })


}

    const proposlFormControls:FormControls[] =[
            
          {name:'content',label:'Proposal',control:'textarea'},
        ]

        const formParams:FormParams ={
          formObject:createFormObject(formikSubmitHandler,
            object({content: string().required('Proposal Content is required')}),initialValues,proposlFormControls),
          buttonLabel:'Submit Proposal',
          headerTitle:`What's your proposal`
          }

  return (
    <FormikContainer formParams={formParams}/>
  )
}

export default ApplyJobForm