import { Box, FormGroup, TextField ,Card,CardHeader,CardActions, Button, CardContent} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { Field, Form, Formik ,ErrorMessage} from "formik";
import {object,string} from 'yup'
import { login } from "@/store/slices/userSlice";
import { useDispatch ,useSelector} from "react-redux";
import { AppDispatch,RootState } from "@/store";
import {useEffect} from 'react'


const initialValues={
  email:'',
  password:'',
}


export default function Login(){
  const router = useRouter() 
  
  const {loginDetails,user} = useSelector((state:RootState)=>state.users)
     
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
    if(loginDetails && loginDetails.isLoginValid && user && user.type === 'Skilled Worker'){
      router.push('/sw-dashboard')
    }else{
      router.push('/account/login')
    }
  },[loginDetails,user,router])
  
  return(

    <Card sx={{
      marginTop:'5rem'
    }}>
      <CardHeader title='Login to your  account'/>
      <CardContent>
          
          <Formik initialValues={initialValues} onSubmit={(values,formikHelpers)=>{

            return new Promise(res=>{
                  formikHelpers.validateForm().then(async (data)=>{
                  const msg = await submitHandler(values)
                  res(msg)
                  }).catch((err)=>{
                    console.log(err)
                  })              
            })

          }} validationSchema={loginSchema}>
            
           {({values,errors,touched,isSubmitting,isValidating}) => (
            <Form>
                <Box marginBottom={2}  marginTop={2}>
                <FormGroup>
                    <Field type='email' name='email' as={TextField} label="Email"/>
                    <ErrorMessage name="email"/>
                </FormGroup>
                </Box>
                <Box  marginBottom={2}>
                <FormGroup>
                <Field type='password' name='password' as={TextField} label="Password"/>
                <ErrorMessage name="password"/>
                </FormGroup>
                </Box>
               <CardActions>
               <Button variant="contained" type="submit" fullWidth disabled={isSubmitting || isValidating}>Login</Button>
               </CardActions>
                <Link href="/account/forgotpassword" >forgot password?</Link>
            {/* <pre>{JSON.stringify(values,null,4)}</pre>
            <pre>{JSON.stringify(errors,null,4)}</pre> */}
            </Form>
           )}
            
          </Formik>
      </CardContent>
    </Card>
  )
          }
    
