import { Box, FormGroup, TextField ,Card,CardHeader,CardActions, Button, CardContent} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios"
import { Field, Form, Formik ,ErrorMessage} from "formik";
import {object,string} from 'yup'
import RadioButtonGroup from "@/components/radioButtonGroup";



type signUpDetails ={
  email:string
  phone:string
  password:string
  confirmPassword:string
  type:'Skilled Worker' | 'Client'
}
const initialValues : signUpDetails={
  email:'',
  phone:'',
  password:'',
  confirmPassword:'',
  type:'Skilled Worker'
}


export default function SignUp(){
  const router = useRouter()
     


//sign up submit handler
const submitHandler = async (values:signUpDetails)=>{

  
      try{
        const res = await axios({
          method:'POST',
          url:`${process.env.SMNK_URL}api/users/signup`,
          data:values
      })
      const data = await res.data
      
      if(data.isSignUpValid){
        alert(data.Message)
                
          router.push('/account/login')
        
      }else{
        alert(data.Message)
      }
      
      }catch(err:any){
        
        alert(err.response.data.Message)
      }
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
          })              
    })

  }

  const signupSchema = object({
                              email: string().email('invalid email').required('Email is required'),
                              phone: string().required('Phone is required'),
                              password: string().required('Password is required'),
                              confirmPassword: string().required('Confirm Password is required'),
                            })
  
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
                 <RadioButtonGroup radios={['Skilled Worker', 'Client']}/>
                </Box>
                <CardActions>
                <Button sx={{
                  marginBottom:'1rem'
                }} variant="contained" fullWidth type="submit" disabled={isSubmitting || isValidating}>Sign Up</Button>
                
                </CardActions>
                <Link href="/account/login">already have an account? Login</Link>
            {/* <pre>{JSON.stringify(values,null,4)}</pre> */}
           
            </Form>
           )}
            
          </Formik>
      </CardContent>
    </Card>
  )
        }
