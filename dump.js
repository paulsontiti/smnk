

const login = new LoginDetails()
const loginValidator = new LoginValidator()
const otpValidator = new OtpValidator()
const otp = new Otp()


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
  