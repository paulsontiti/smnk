import { Box, FormGroup, TextField ,Card,CardHeader,CardActions, Button, CardContent} from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios"
import { Field, Form, Formik ,ErrorMessage} from "formik";
import {object,string} from 'yup'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const initialValues={
  oldPassword:'',
  password:'',
  confirmPassword:''
}


export default function ChangePasswordForm(){
  const router = useRouter()
    
  const {_id} = useSelector((state:RootState)=>state.users.user)


//sign up submit handler
const submitHandler = async (values:{oldPassword:string,password:string,_id:string})=>{

  //return console.log(values)
      
}

//formik submit handler
const formikSubmitHandler = (values:any,formikHelpers:any)=>{
values._id = _id
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
                              
                              oldPassword: string().required('Old Password is required'),
                              password: string().required('New Password is required'),
                              confirmPassword: string().required('Confirm Password is required'),
                            })
  
  return(

    <Card sx={{
      marginTop:'5rem'
    }}>
      <CardHeader title='Change Your Password'/>
      <CardContent>
        
          <Formik initialValues={initialValues} onSubmit={formikSubmitHandler} validationSchema={changePasswordSchema}>
            
           {({values,errors,touched,isSubmitting,isValidating}) => (
            <Form>
                
                <Box marginBottom={2}  marginTop={2}>
                <FormGroup>
                    <Field type='password' name='oldPassword' as={TextField} label="Old Password"/>
                    <ErrorMessage name="oldPassword"/>
                </FormGroup>
                </Box>
                <Box  marginBottom={2}>
                <FormGroup>
                <Field type='password' name='password' as={TextField} label="New Password"/>
                <ErrorMessage name="password"/>
                </FormGroup>
                </Box>
                <Box  marginBottom={2}>
                <FormGroup>
                <Field type='password' name='confirmPassword' as={TextField} label="Confirm Password"/>
                <ErrorMessage name="confirmPassword"/>
                </FormGroup>
                </Box>
               
                <CardActions>
                    <Button variant="contained" fullWidth type="submit" disabled={isSubmitting || isValidating}>Change Password</Button>
                </CardActions>
              
            {/* <pre>{JSON.stringify(values,null,4)}</pre> */}
           
            </Form>
           )}
            
          </Formik>
      </CardContent>
    </Card>
  )
        }
