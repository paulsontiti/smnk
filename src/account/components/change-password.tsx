
import { useRouter } from "next/router";
import axios from "axios"
import {object,ref,string} from 'yup'
import { FormControls, FormParams, createFormObject } from "@/lib/form";
import FormikContainer from "@/components/form/formikContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/store";


const initialValues={
  email:'',
  phone:'',
  password:'',
  confirmPassword:''
}


export default function ChangePassword(){
  const router = useRouter()
  const {user} = useSelector((state:RootState)=>state.users)


//sign up submit handler
const submitHandler = async (values:{email:string,password:string,phone:string})=>{

  
      try{
        const res = await axios({
          method:'POST',
          url:`${process.env.SMNK_URL}api/users/change-password`,
          data:values
      })
      const data = await res.data
      
      if(data.successful){
        alert(data.message)
                
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
        
      }else{
        alert(data.message)
      }
      
      }catch(err:any){
        alert(err.response.data.message)
      }
}

//formik submit handler
const formikSubmitHandler = (values:any,formikHelpers:any)=>{

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
                              email: string().email('invalid email').required('Email is required'),
                              phone: string().required('Phone is required'),
                              password: string().required('New Password is required'),
                              confirmPassword: string().oneOf([ref('password'),''],'Passwords must match').required('Confirm Password is required'),
                            })

const forgotPasswordFormControls: FormControls[] = [
{name:'email',label:'Email',control:'input',type:'email'},
{name:'phone',label:'Phone Number',control:'input',type:'phone'},
{name:'password',label:'Password',control:'input',type:'password'},
{name:'confirmPassword',label:'Confirm Password',control:'input',type:'password'}
]


const formParams:FormParams ={
formObject:createFormObject(formikSubmitHandler,changePasswordSchema,initialValues,forgotPasswordFormControls),
buttonLabel:'Change Password',
headerTitle:'Change Your Password'
}

return(

<FormikContainer formParams={formParams}/>
)
 }
