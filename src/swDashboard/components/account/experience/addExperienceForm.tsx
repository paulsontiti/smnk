
import { AppDispatch, RootState} from '@/store';
import { useDispatch, useSelector} from 'react-redux';

import { NextRouter } from "next/router";
import { Experience, expDetailsSchema, expFormControls, experienceSubmitHandler } from "@/lib/experience";
import { FormParams, createFormObject } from "@/lib/form";
import FormikContainer from "@/components/form/formikContainer";
import { updateUser } from '@/store/slices/userSlice';


export default function AddExperienceForm({router}:{router:NextRouter}){

  const dispatch = useDispatch<AppDispatch>()
      
  const initialValues :Experience={
      title:'',company:'',
      state:'',lga:'',address:'',
      description:'',startDate:new Date(),onRole:false
    }
  
  //formik submit handler
  const formikSubmitHandler = (values:any,formikHelpers:any)=>{
  
    return new Promise(res=>{
          formikHelpers.validateForm().then(async (data:any)=>{
            const msg = await experienceSubmitHandler(values,router)
            //update user details in local storage
            dispatch(updateUser())
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