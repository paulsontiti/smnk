import { Box, FormGroup, TextField ,Card,CardHeader,CardActions, Button, CardContent, Radio, FormControlLabel} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { Field, Form, Formik ,ErrorMessage} from "formik";
import {object,string} from 'yup'
import { signUpDetails } from "@/lib/types/signUp";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { signUp } from "@/store/slices/userSlice";
import {useEffect} from 'react'
import { RadioGroup } from "@mui/material";


const initialValues : signUpDetails={
  email:'',
  phone:'',
  password:'',
  confirmPassword:'',
  type:'Skilled Worker',
  typeClass:'Individual'
}

export default function SignUp(){
  const router = useRouter()
  const {user} = useSelector((state:RootState)=>state.users)
     
  const dispatch = useDispatch<AppDispatch>()


//sign up submit handler
const submitHandler = async (values:signUpDetails)=>{
    dispatch(signUp(values))      
}

//formik submit handler
const formikSubmitHandler = (values:any,formikHelpers:any)=>{
  
    return new Promise(res=>{
          formikHelpers.validateForm().then(async (data:any)=>{
            if(values.password !== values.confirmPassword){
                formikHelpers.setFieldError('confirmPassword','Password does not match with Confirm Password')
                res(false)
            }else{
                const msg = await submitHandler(values)
          res(msg)
            }
          
          }).catch((err:any)=>{
            console.log(err)
            res(err)
          })              
    })

  }

  const signupSchema = object({
                              email: string().email('invalid email').required('Email is required'),
                              phone: string().required('Phone is required'),
                              password: string().required('Password is required'),
                              confirmPassword: string().required('Confirm Password is required'),
                            })
  


useEffect(()=>{
  if(user){
    if(user.type === 'Skilled Worker'){
      router.push('/sw-dashboard')
    }else if(user.type === 'Client'){
      router.push('/c-dashboard')
    }
  }
},[user,router])


  return(

    <Card sx={{
      marginTop:'5rem'
    }}>
      <CardHeader title='Create an account with SMNK'/>
      <CardContent>
          
          <Formik initialValues={initialValues} onSubmit={formikSubmitHandler} validationSchema={signupSchema}>
            
           {({values,errors,touched,isSubmitting,isValidating}) => (
            
            <Form>
                <Box marginBottom={2}  marginTop={2}>
                <FormGroup>
                    <Field type='email' name='email' as={TextField} label="Email"/>
                    <ErrorMessage name="email"/>
                </FormGroup>
                </Box>
                <Box marginBottom={2}  marginTop={2}>
                <FormGroup>
                    <Field type='phone' name='phone' as={TextField} label="Phone Number"/>
                    <ErrorMessage name="phone"/>
                </FormGroup>
                </Box>
                <Box  marginBottom={2}>
                <FormGroup>
                <Field type='password' name='password' as={TextField} label="Password"/>
                <ErrorMessage name="password"/>
                </FormGroup>
                </Box>
                <Box  marginBottom={2}>
                <FormGroup>
                <Field type='password' name='confirmPassword' as={TextField} label="Confirm Password"/>
                <ErrorMessage name="confirmPassword"/>
                </FormGroup>
                </Box>
                <Box  marginBottom={2}>
                  <RadioGroup name="type" value={values.type}>
                    
                 <Box>
                    <Field   value='Skilled Worker' as={Radio} label='Skilled Worker' />
                    <span>Skilled Worker</span>
                 </Box>
                    <Box>
                        <Field value='Client'  as={Radio} label='Client' />
                        <span>Client</span>
                    </Box>
                  </RadioGroup>
                    
                </Box>
                <Box  marginBottom={2}>
                  <RadioGroup name="typeClass" value={values.typeClass}>
                    
                 <Box>
                    <Field   value='Individual' as={Radio} label='Individual' />
                    <span>Individual</span>
                 </Box>
                    <Box>
                        <Field value='Company'  as={Radio} label='Company' />
                        <span>Company</span>
                    </Box>
                  </RadioGroup>
                    
                </Box>
                <CardActions>
                <Button sx={{
                  marginBottom:'2rem'
                }} variant="contained" fullWidth type="submit" disabled={isSubmitting || isValidating}>Sign Up</Button>
                
                </CardActions>
                <Link href="/account/login">already have an account? Login</Link>
            </Form>
           )}
            
          </Formik>
      </CardContent>
    </Card>
  )
        }
