
import { Box, FormGroup, TextField ,Button} from "@mui/material";
import { Field, Form, Formik ,ErrorMessage} from "formik";

import { RootState} from '@/store';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useRouter } from "next/router";
import { Service,serviceDetailsSchema, serviceFormControls, serviceSubmitHandler } from "@/lib/types/service";
import { FormParams, createFormObject } from "@/lib/form";
import FormikContainer from "@/components/form/formikContainer";



export default function AddServiceForm(){

  const router = useRouter()
  

  const {_id} = useSelector((state:RootState)=>state.users.user)
      
  const initialValues :Service={
      title:'',
      skills:[],
      description:'',
      category:'',
      userId:_id,
      
    }


  
  //formik submit handler
  const formikSubmitHandler = (values:any,formikHelpers:any)=>{
  
    if(values.userId){
      return new Promise(res=>{
            formikHelpers.validateForm().then(async (data:any)=>{
                const msg = await serviceSubmitHandler(values,router,'api/sw-dashboard/service/add-service')
                res(msg)
            }).catch((err:any)=>{
              console.log('Error from formik ',err)
              res(err)
            })              
      })
    }else{
      alert('Invalid request, Please provide UserId')
    }

  }


  const formParams:FormParams ={
    formObject : createFormObject(formikSubmitHandler,serviceDetailsSchema,initialValues,serviceFormControls),
    buttonLabel:'Add Service',
    headerTitle:'Add Your Service'
  }
    return(
        <FormikContainer formParams={formParams}/>
    )
}