import React, { useRef, useState } from 'react'
import FormikContainer from '../form/formikContainer'
import {FormControls, FormParams, createFormObject } from '@/lib/form'
import {object, string } from 'yup'
import {useRouter} from 'next/router'
import { Rating } from '@/lib/rating'
import axios from 'axios'
import SnackbarComponent from '../snackbar/SnackBar'
import {AlertColor} from '@mui/material'

function RatingForm({jobId,raterId,url}:{jobId:string,raterId:string,url:string}) {
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");

  //declare refs
  const snackBarRef = useRef();
    const router = useRouter()

      //rating submit handler
const ratingSubmitHandler = async (values:Rating,router:any,url:string)=>{
    
    try{
        if(values.raterId && values.jobId){
                const res = await axios({
                    method:'POST',
                    url:`${process.env.SMNK_URL}api/rating/rate`,
                    data:values
                })
                const data = await res.data
                if(data.successful){
                  setMsg(data.message);
                  setColor("success");
                  const refState = snackBarRef.current as any;
                  refState.handleClick();
                    router.push(url)
                }else{
                  setMsg(data.message);
                  setColor("error");
                  const refState = snackBarRef.current as any;
                  refState.handleClick();
                }
          }else{
            setMsg('Invalid request');
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          }
            
        
  }catch(err:any){
    setMsg(err.response.data.message);
    setColor("error");
    const refState = snackBarRef.current as any;
    refState.handleClick();
    console.log(err)
    return err
  }
}

     //formik submit handler
  const formikSubmitHandler = (values:any,formikHelpers:any)=>{
   
    return new Promise(res=>{
     
          formikHelpers.validateForm().then(async (data:any)=>{
               ratingSubmitHandler(values,router,url)
              res(data)
          }).catch((err:any)=>{
            setMsg(err.message);
            setColor("error");
            const refState = snackBarRef.current as any;
            refState.handleClick();
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
          <>
            <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
            <FormikContainer formParams={formParams} />
          </>
        );
}

export default RatingForm