
import { RootState} from '@/store';
import { useSelector} from 'react-redux';
import { useRouter } from "next/router";
import { editInfoSubmitHandler, individualInfoSchema} from "@/lib/utils/editInfo";
import useSWR from 'swr'
import { getUserInfo } from "@/lib/utils/user";
import FormikContainer from "@/components/form/formikContainer";
import { FormControls, FormParams, createFormObject, states } from "@/lib/form";
import { useEffect, useState } from 'react';




export default function EditIndividualInfoForm(){
   
const router = useRouter()

const {_id} = useSelector((state:RootState)=>state.users.user)
const [data,setData] = useState<any>()
   
      
    
useEffect(()=>{
  (
    async()=>{
      const res = await getUserInfo(_id)
      setData(res.data)
    }
  )()
},[_id])

if(!data) return <p>loading..............</p>

  //formik submit handler
  const formikSubmitHandler = (values:any,formikHelpers:any)=>{
  
    return new Promise(res=>{
          formikHelpers.validateForm().then(async (data:any)=>{
              const msg = await editInfoSubmitHandler(values,_id,router)
              res(msg)
          }).catch((err:any)=>{
            alert(err)
            res(err)
          })              
    })

  }


const infoFormControls:FormControls[]=[
    {name:'firstName',label:'First Name', control:'input'},
    {name:'lastName',label:'Last Name', control:'input'},
    {name:'userName',label:'User Name', control:'input'},
    {name:'state',label:'State', control:'select',options:states},
    {name:'lga',label:'LGA', control:'select',options:states,fieldToCheckAgainst:'state'},
    {name:'address',label:'Address', control:'input'},
    {name:'description',label:'Description', control:'textarea'},
  ]


const formParams:FormParams ={
  formObject : createFormObject(formikSubmitHandler,individualInfoSchema,data,infoFormControls),
  buttonLabel:'Submit',
  headerTitle:'Edit Your Profile'
}
  return(
      <FormikContainer formParams={formParams}/>
  )
}
