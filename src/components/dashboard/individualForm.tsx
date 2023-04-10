
import { Box, FormGroup, TextField ,Button} from "@mui/material";
import { Field, Form, Formik ,ErrorMessage} from "formik";
import {object,string} from 'yup'
import { RootState } from '@/store';
import { useSelector} from 'react-redux';
import { IndividualPersonalInfo, LGA, State } from "@/lib/types/userInfo";
import axios from "axios";
import FormikContainer from "../form/formikContainer";
import { FormControlObject, FormParams, createFormObject, states } from "@/lib/form";


   
export default function IndividualForm({router}:{router:any}){

  const {user} = useSelector((state:RootState)=>state.users)
  

    
const individualInfoSchema = object({
    firstName: string().required('First Name is required'),
    lastName: string().required('Last Name is required'),
    userName: string().required('Username is required'),
    address: string().required('Street Address is required'),
    state: string().required('State is required'),
    lga: string().required('L.G.A is required'),
    description: string().min(200,'Description should be at least 200 characters').required('Description is required'),
  })


      
  const individualValues :IndividualPersonalInfo={
      firstName:'',
      lastName:'',
      userName:'',
      state:'',
      lga:'',
      address:'',
      description:'',
      userId: user._id,
    }

    
  //sign up submit handler
  const submitHandler = async (values:IndividualPersonalInfo)=>{

    if(user){
        try{
          const res = await axios({
                method:'POST',
                url:`${process.env.SMNK_URL}api/personal-info/add-personal-info`,
                data:values
            })
          const data = await res.data
            alert(data.message)
            //console.log(data)
            if(data.info){
              router.push('/dashboard/individual')
            }
            
          }catch(err:any){
            alert(err.response.data.message)
            return 
          }
    }else{
      alert('Bad request!!!! No user id')
    }                                        
}
  
  //formik submit handler
  const formikSubmitHandler = (values:any,formikHelpers:any)=>{
  
    return new Promise(res=>{
          formikHelpers.validateForm().then(async (data:any)=>{
              const msg = await submitHandler(values)
              res(msg)
          }).catch((err:any)=>{
            alert(err)
            res(err)
          })              
    })

  }


const infoFormObject:FormControlObject ={
  initialValues : individualValues,
  validationSchema: individualInfoSchema,
  onSubmit: formikSubmitHandler,
  formControls:[
    {name:'firstName',label:'First Name', control:'input'},
    {name:'lastName',label:'Last Name', control:'input'},
    {name:'userName',label:'User Name', control:'input'},
    {name:'state',label:'State', control:'select',options:states},
    {name:'lga',label:'LGA', control:'select',options:states,fieldToCheckAgainst:'state'},
    {name:'address',label:'Address', control:'input'},
    {name:'description',label:'Description', control:'textarea'},
  ]
}

const formParams:FormParams ={
  formObject : createFormObject(formikSubmitHandler,individualInfoSchema,individualValues,infoFormObject.formControls),
  buttonLabel:'Create Profile',
  headerTitle:'Create Your Profile'
}
  return(
      <FormikContainer formParams={formParams}/>
  )
}