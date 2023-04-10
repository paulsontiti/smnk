
import { Box, FormGroup, TextField ,Button} from "@mui/material";
import { Field, Form, Formik ,ErrorMessage} from "formik";
import { RootState} from '@/store';
import { useSelector } from 'react-redux';
import { useRouter } from "next/router";
import {useState,useEffect} from 'react'
import { Service,serviceDetailsSchema, serviceFormControls, serviceSubmitHandler } from "@/lib/types/service";
import axios from "axios";
import FormikContainer from "@/components/form/formikContainer";
import { FormParams, createFormObject } from "@/lib/form";




export default function EditServiceForm({id}:{id:string}){

  const router = useRouter()
  

  const {_id} = useSelector((state:RootState)=>state.users.user)
      
  const [serv,setServ]  = useState<Service>()

  useEffect(()=>{
    (
      async ()=>{
        try{
          const res = await axios({
                  method:'POST',
                  url:`${process.env.SMNK_URL}api/sw-dashboard/service/service-by-id`,
                  data:{id}
              })
          const data = await res.data
          setServ(data)
          
  
        }catch(err:any){
            console.log(err)
            return
        }
            }
    )()
  },[id])

  if(!serv) return <p>loading......</p>


//formik submit handler
const formikSubmitHandler = (values:any,formikHelpers:any)=>{
  
  if(values.userId){
    return new Promise(res=>{
          formikHelpers.validateForm().then(async (data:any)=>{
              const msg = await serviceSubmitHandler(values,router,'api/sw-dashboard/service/edit-service')
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
  formObject : createFormObject(formikSubmitHandler,serviceDetailsSchema,serv,serviceFormControls),
  buttonLabel:'Edit Service',
  headerTitle:'Edit Your Service'
}
  return(
      <FormikContainer formParams={formParams}/>
  )
  
  
}