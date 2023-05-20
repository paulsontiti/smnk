
import Link from "next/link";
import { useRouter } from "next/router";
import LoginIcon from '@mui/icons-material/Login';
import {object,string} from 'yup'
import { login } from "@/store/slices/userSlice";
import { useDispatch ,useSelector} from "react-redux";
import { AppDispatch,RootState } from "@/store";
import {useEffect} from 'react'
import { FormControls, FormParams, createFormObject } from "@/lib/form";
import FormikContainer from "@/components/form/formikContainer";


const initialValues={
  email:'',
  password:'',
}


export default function Login(){
  const router = useRouter() 
  
  const {user} = useSelector((state:RootState)=>state.users)
     
  const dispatch = useDispatch<AppDispatch>()


//login submit handler
const submitHandler = async (values:{email:string,password:string})=>{

  await dispatch(login(values))
}

  const loginSchema = object({
                              email: string().email('invalid email').required('Email is required'),
                              password: string().required('Password is required'),
                            })

                            useEffect(()=>{
                              if(user){
                          
                                switch(true){
                                  case user.type === 'skilled worker':
                                    router.push('/sw-dashboard')
                                    break
                                  case user.type === 'client':
                                    router.push('/c-dashboard')
                                    break
                                  case user.type === 'admin':
                                    router.push('/a-dashboard')
                                    break
                                  
                                }
                              }   
                            },[user,router])
  
 //formik submit handler
const formikSubmitHandler = (values:any,formikHelpers:any)=>{

      return new Promise(res=>{
        formikHelpers.validateForm().then(async (data:any)=>{
        const msg = await submitHandler(values)
        res(msg)
        }).catch((err:any)=>{
        res(err)
        })              
    })
  }





const loginFormControls: FormControls[] = [
{name:'email',label:'Email',control:'input',type:'email'},
{name:'password',label:'Password',control:'input',type:'password'}
]


const formParams:FormParams ={
formObject:createFormObject(formikSubmitHandler,loginSchema,initialValues,loginFormControls),
buttonLabel:'Login',
headerTitle:'Login To Your SMNK Account',
endIcon:<LoginIcon/>
}

return(
    <>
        <FormikContainer formParams={formParams}/>
        <Link href='/account/forgotpassword'>forgot password?</Link>
    </>
)
}
    