import { Box, FormGroup, TextField ,Card,CardHeader,CardActions, Button, CardContent} from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios"
import { Field, Form, Formik ,ErrorMessage} from "formik";
import {object,ref,string} from 'yup'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import FormikContainer from "../form/formikContainer";
import { FormControls, FormParams, createFormObject } from "@/lib/form";

const initialValues={
  oldPassword:'',
  password:'',
  confirmPassword:''
}


export default function ChangePasswordForm(){
  const router = useRouter()
    
  const {user} = useSelector((state:RootState)=>state.users)


//sign up submit handler
const submitHandler = async (values:{oldPassword:string,password:string,userId:string})=>{

  try{
    const res = await axios({
          method:'POST',
          url:`${process.env.SMNK_URL}api/sw-dashboard/change-password`,
          data:values
      })
    const data = await res.data
      alert(data.message)
      if(data.successful && user && user.typeClass === 'company'){
            router.push('/dashboard/company')
          }else if(data.successful && user && user.typeClass === 'individual'){
              router.push('/dashboard/individual')
            }
}catch(err:any){
  alert(err.response.data.message)
  return 
}      
      
}

//formik submit handler
const formikSubmitHandler = (values:any,formikHelpers:any)=>{
    values.userId = user._id
    return new Promise(res=>{
          formikHelpers.validateForm().then(async (data:any)=>{
            const msg = await submitHandler(values)
            res(msg)
          }).catch((err:any)=>{
            console.log(err)
          })              
    })

  }

  const changePasswordSchema = object({
    oldPassword: string().required('Old Password is required'),
    password: string().required('New Password is required'),
    confirmPassword: string().oneOf([ref('password'),''],'New Password must match with Confirm Password').required('Confirm Password is required'),
  })

  const changePasswordFormControls:FormControls[]  = [
    {name:'oldPassword',label:'Old Password',control:'input',type:'password'},
    {name:'password',label:'New Password',control:'input',type:'password'},
    {name:'confirmPassword',label:'Confirm Password',control:'input',type:'password'},
  ]                          

  const formParams:FormParams ={
    formObject : createFormObject(formikSubmitHandler,changePasswordSchema,initialValues,changePasswordFormControls),
    buttonLabel:'Change Password',
    headerTitle:'Change Your Password'
  }
    return(
        <FormikContainer formParams={formParams}/>
    )
                          
}
