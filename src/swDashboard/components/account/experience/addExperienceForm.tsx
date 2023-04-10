
import { RootState} from '@/store';
import { useSelector} from 'react-redux';

import { NextRouter } from "next/router";
import { Experience, expDetailsSchema, expFormControls, experienceSubmitHandler } from "@/lib/experience";
import { FormParams, createFormObject } from "@/lib/form";
import FormikContainer from "@/components/form/formikContainer";


export default function AddExperienceForm({router}:{router:NextRouter}){
  const {_id} = useSelector((state:RootState)=>state.users.user)
      
  const initialValues :Experience={
      title:'',company:'',
      state:'',lga:'',address:'',
      description:'',startDate:null,userId:_id,onRole:false
    }
  
  //formik submit handler
  const formikSubmitHandler = (values:any,formikHelpers:any)=>{
  
    return new Promise(res=>{
          formikHelpers.validateForm().then(async (data:any)=>{
              const msg = await experienceSubmitHandler(values,router,'api/sw-dashboard/experience/add-experience')
              res(msg)
          }).catch((err:any)=>{
            console.log('Error from formik ',err)
            res(err)
          })              
    })

  }


  const formParams:FormParams ={
    formObject : createFormObject(formikSubmitHandler,expDetailsSchema,initialValues,expFormControls),
    buttonLabel:'Add Experience',
    headerTitle:'Create Your Experience'
  }
    return(
        <FormikContainer formParams={formParams}/>
    )
}