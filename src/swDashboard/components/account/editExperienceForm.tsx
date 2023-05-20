
import { NextRouter } from "next/router";
import FormikContainer from "@/components/form/formikContainer";
import { Experience, expDetailsSchema, expFormControls, experienceSubmitHandler } from "@/lib/experience";
import { FormParams, createFormObject } from "@/lib/form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { updateUser } from "@/store/slices/userSlice";


export default function EditExperienceForm({router,index}:{router:NextRouter,index:number}){
  const dispatch = useDispatch<AppDispatch>()

  const {user:{experience}} = useSelector((state:RootState)=>state.users)
  
  //get the experience to edit
const expObj = experience[index]

//copy nto another experience object
const exp:Experience = {...expObj}



//formik submit handler
const formikSubmitHandler = (values:any,formikHelpers:any)=>{

  return new Promise(res=>{
        formikHelpers.validateForm().then(async (data:any)=>{
          const msg = await experienceSubmitHandler(values,router,index)
          dispatch(updateUser())
            res(msg)
        }).catch((err:any)=>{
          console.log('Error from formik ',err)
          res(err)
        })              
  })

}

const formParams:FormParams ={
  formObject : createFormObject(formikSubmitHandler,expDetailsSchema,exp,expFormControls),
  buttonLabel:'Edit Experience',
  headerTitle:'Edit Your Experience'
}
  return(
      <FormikContainer formParams={formParams}/>
  )
}