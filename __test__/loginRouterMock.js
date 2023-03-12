import { useRouter } from 'next/router';
import { Box, Paper, TextField ,Container,Typography, Button} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoginDetails from "../src/account/classes/login";
import UseForm from "../src/account/utils/useForm";
import LoginValidator from "../src/account/classes/validators/loginValidator";
import OtpValidator from "../src/account/classes/validators/otpValidator";
import Otp from "../src/account/classes/otp";

jest.mock('next/router', () => require('next-router-mock'));

const login = new LoginDetails()
const loginValidator = new LoginValidator()
const otpValidator = new OtpValidator()
const otp = new Otp()
const initialValues={
  email:'',
  password:'',
  phone:'',
  otp: ''
}


export default function LoginRouterMock(){
  const router = useRouter()

  const {values,setValues,handleInputChange} = UseForm(initialValues)
  const [loginExtras,setLoginExtras] = useState({
                                        errMsg:'',
                                        isLoginDetailsValid:false,
                                        emailErrMsg:'',
                                        phoneErrMsg:'',
                                        otpErrMsg:'',
                                        passwordErrMsg:''
                                      })
const [emailErrMsg,setEmailErrMsg] = useState('')
const [phoneErrMsg,setPhoneErrMsg] = useState('')
const [otpErrMsg,setOtpErrMsg] = useState('')
const [passwordErrMsg,setPasswordErrMsg] = useState('')                               

useEffect(()=>{
  login.setEmail(values.email)
    loginValidator.validateEmail(login)

    setEmailErrMsg(loginValidator.getEmailErrMsg())
},[values.email])

useEffect(()=>{
  login.setPhone(values.phone)
    loginValidator.validatePhone(login)

    setPhoneErrMsg(loginValidator.getPhoneErrMsg())
},[values.phone])

useEffect(()=>{
  login.setPassword(values.password)
    loginValidator.validatePassword(login)

    setPasswordErrMsg(loginValidator.getPasswordErrMsg())
},[values.password])

useEffect(()=>{
  otp.setValue(values.otp)
    otpValidator.validateOtp(otp)

    setOtpErrMsg(otpValidator.getOtpErrMsg())
},[values.otp])

//handle every change in email
  useEffect(()=>{
  
    loginValidator.validateDetails(login)
    setLoginExtras({...loginExtras,
    isLoginDetailsValid: login.getIsDetailsValid() && otpValidator.getIsOtpValid(),
    errMsg : loginValidator.getErrorMsg()
  })
  },[values])

 

  const handleLogin = ()=>{
    
    loginValidator.validateDetails(login)
    if(loginValidator.getIsEmailValid()){
router.push('/')
    }
  }
  return(

     <Paper 
    //sx={{
    //   display:'flex',
    //   justifyContent:'center',
    //   alignItems:'center',
    //   margin:'5rem 20rem',
    //   padding:'2rem 5rem'
    // }}
    >
      <form>
      
      <Container >
      <h4>Please enter Your Email and Password</h4>
              <Box>
                  <TextField variant="standard" label="Email"
                      type="email"
                      value={values.email}
                      name="email"
                      onChange={handleInputChange}
                  />
                  <Typography>{emailErrMsg}</Typography>
                  <TextField variant="standard" label="Phone number"
                      value={values.phone}
                      name="phone"
                      onChange={handleInputChange}
                      onBlur={()=>{
                        login.setPhone(values.phone)
                        loginValidator.validatePhone(login)
                      }}
                  />
       <Typography>{phoneErrMsg}</Typography>
      <TextField variant="standard" label="Otp"
                      value={values.otp}
                      name="otp"
                      onChange={handleInputChange}
                      onBlur={()=>{
                        otp.setValue(values.otp)
                        otpValidator.validateOtp(otp)
                      }}
                  />
                  <Typography>{otpErrMsg}</Typography>
                  <TextField variant="standard" label="Password" type="password"
                      value={values.password}
                      name="password"
                      onChange={
                        handleInputChange
                      }
                      />
                  <Typography>{passwordErrMsg}</Typography>
              </Box>
              </Container>
              <div >
                  <div>
                  <Button size="small" variant="contained"
                            disabled={!loginExtras.isLoginDetailsValid}
                            onClick={handleLogin}
                            >Login</Button>
                </div>
                <div>
                  <Link href='/account/forgotpassword'>Forgot Password?</Link>
              </div>
              </div> 
          </form>
            
    </Paper>
  )
}