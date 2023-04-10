
import { Box, FormGroup, TextField ,Button, Checkbox, FormControlLabel,Typography} from "@mui/material";
import { Field, Form, Formik ,ErrorMessage} from "formik";
import {useState,useEffect } from "react";
import { LGA, State } from "@/lib/types/userInfo";
import { NextRouter } from "next/router";
import FormikContainer from "@/components/form/formikContainer";
import { Experience, expDetailsSchema, expFormControls, experienceSubmitHandler } from "@/lib/experience";
import { FormParams, createFormObject } from "@/lib/form";
import axios from "axios";
import useSWR from 'swr'

export default function EditExperienceForm({router,expId}:{router:NextRouter,expId:string}){

const [exp,setExp]  = useState<Experience>()

useEffect(()=>{
  (
    async ()=>{
      try{
        const res = await axios({
                method:'POST',
                url:`${process.env.SMNK_URL}api/sw-dashboard/experience/edit-experience`,
                data:{expId}
            })
        const data = await res.data
        setExp(data)
        

      }catch(err:any){
          console.log(err)
          return
      }
          }
  )()
},[expId])

if(exp){

//formik submit handler
const formikSubmitHandler = (values:any,formikHelpers:any)=>{

  return new Promise(res=>{
        formikHelpers.validateForm().then(async (data:any)=>{
            const msg = await experienceSubmitHandler(values,router,'api/sw-dashboard/edit-experience')
            res(msg)
        }).catch((err:any)=>{
          console.log('Error from formik ',err)
          res(err)
        })              
  })

}

const formParams:FormParams ={
  formObject : createFormObject(formikSubmitHandler,expDetailsSchema,exp,expFormControls),
  buttonLabel:'Edit Experience',
  headerTitle:'Edit Your Experience'
}
  return(
      <FormikContainer formParams={formParams}/>
  )
}else{
  return <p>loading .....</p>
}
}