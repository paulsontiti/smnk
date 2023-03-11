import { Box, FormGroup, TextField ,Card,Typography, Button, CardContent} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios"
import { Field, Form, Formik ,ErrorMessage} from "formik";
import {object,string} from 'yup'


const initialValues={
  email:'',
  password:'',
}


export default function Login(){
  const router = useRouter()
     


//login submit handler
const submitHandler = async (values:{email:string,password:string})=>{

  
      try{
        const res = await axios({
          method:'POST',
          url:'http://localhost:3000/api/users/login',
          data:values
      })
      const data = await res.data
      
      if(data.isLoginValid){
        alert(data.Message)
                
          router.push('/')
        
      }else{
        alert(data.Message)
      }
      
      }catch(err:any){
        alert(err.response.data.Message)
      }
}

  const loginSchema = object({
                              email: string().email('invalid email').required('Email is required'),
                              password: string().required('Password is required'),
                            })
  
  return(

    <Card sx={{
      width:'400px',
      height:'400px'
    }}>
      <CardContent>
          <Typography variant="h5">Login to your  account</Typography>
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
                <Field type='password ' name='password' as={TextField} label="Password"/>
                <ErrorMessage name="password"/>
                </FormGroup>
                </Box>
                <Button variant="text" type="submit" fullWidth disabled={isSubmitting || isValidating}>Login</Button>
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
    