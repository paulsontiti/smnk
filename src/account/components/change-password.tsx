import { Box, FormGroup, TextField ,Card,Typography, Button, CardContent} from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios"
import { Field, Form, Formik ,ErrorMessage} from "formik";
import {object,string} from 'yup'


const initialValues={
  email:'',
  phone:'',
  password:'',
  confirmPassword:''
}


export default function ChangePassword(){
  const router = useRouter()
     


//sign up submit handler
const submitHandler = async (values:{email:string,password:string,phone:string})=>{

  
      try{
        const res = await axios({
          method:'POST',
          url:'https://smnk-v1-0.vercel.app/api/users/change-password',
          data:values
      })
      const data = await res.data
      
      if(data.isChangePasswordSuccessful){
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

  const changePasswordSchema = object({
                              email: string().email('invalid email').required('Email is required'),
                              phone: string().required('Phone is required'),
                              password: string().required('New Password is required'),
                              confirmPassword: string().required('Confirm Password is required'),
                            })
  
  return(

    <Card sx={{
      width:'400px',
      height:'500px'
    }}>
      <CardContent>
          <Typography variant="h5">Create an account with SMNK</Typography>
          <Formik initialValues={initialValues} onSubmit={formikSubmitHandler} validationSchema={changePasswordSchema}>
            
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
                <Field type='password ' name='password' as={TextField} label="New Password"/>
                <ErrorMessage name="password"/>
                </FormGroup>
                </Box>
                <Box  marginBottom={2}>
                <FormGroup>
                <Field type='password ' name='confirmPassword' as={TextField} label="Confirm Password"/>
                <ErrorMessage name="confirmPassword"/>
                </FormGroup>
                </Box>
               
                <Button variant="outlined" fullWidth type="submit" disabled={isSubmitting || isValidating}>Change Password</Button>
              
            {/* <pre>{JSON.stringify(values,null,4)}</pre> */}
           
            </Form>
           )}
            
          </Formik>
      </CardContent>
    </Card>
  )
        }
