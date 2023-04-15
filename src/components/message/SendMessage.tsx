import React from 'react'
import FormikContainer from '../form/formikContainer'
import { FormControlObject, FormControls, FormParams, createFormObject } from '@/lib/form'
import { object, string } from 'yup'
import { Message, messageSubmitHandler } from '@/lib/message'
import {useRouter} from 'next/router'
import SendIcon from '@mui/icons-material/Send';


function SendMessage({receiverId,senderId,url}:{receiverId:string,senderId:string,url:string}) {
    
    const router = useRouter()
     //formik submit handler
  const formikSubmitHandler = (values:any,formikHelpers:any)=>{
   
    return new Promise(res=>{
     
          formikHelpers.validateForm().then(async (data:any)=>{
               messageSubmitHandler(values,router,url)
              res(data)
          }).catch((err:any)=>{
            console.log('Error from formik ',err)
            res(err)
          })    
         
    })


}

const initialValues:Message = {message:'',subject:'',senderId,receiverId}
const validationSchema = object({
  message:string().required('Message is required'),
  subject:string().required('Subject is required'),
})

    const messageFormControls:FormControls[] = [
          {name:'subject',label:'Subject',control:'input'},
          {name:'message',label:'Message',control:'textarea'}
        ]

        const formParams:FormParams ={
          formObject : createFormObject(formikSubmitHandler,validationSchema,initialValues,messageFormControls),
          buttonLabel:'Send',
          headerTitle: `What's on your mind`,
          endIcon: <SendIcon/>
        }
        
  return (
    <FormikContainer formParams={formParams} />
  )
}

export default SendMessage