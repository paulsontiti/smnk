import { useRouter } from "next/router";
import { Service,serviceDetailsSchema, serviceFormControls, serviceSubmitHandler } from "@/lib/types/service";
import { FormParams, createFormObject } from "@/lib/form";
import FormikContainer from "@/components/form/formikContainer";
import { updateUser } from "@/store/slices/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";



export default function AddServiceForm(){

  const dispatch = useDispatch<AppDispatch>()

  const router = useRouter()
      
  const initialValues :Service={
      title:'',
      skills:[],
      description:'',
      category:''      
    }


  
  //formik submit handler
  const formikSubmitHandler = (values:any,formikHelpers:any)=>{
  
    if(values){
      return new Promise(res=>{
            formikHelpers.validateForm().then(async (data:any)=>{
                const msg = await serviceSubmitHandler(values,router)
                dispatch(updateUser())
                res(msg)
            }).catch((err:any)=>{
              console.log('Error from formik ',err)
              res(err)
            })              
      })
    }else{
      alert('Invalid request, Please provide UserId')
    }

  }


  const formParams:FormParams ={
    formObject : createFormObject(formikSubmitHandler,serviceDetailsSchema,initialValues,serviceFormControls),
    buttonLabel:'Add Service',
    headerTitle:'Add Your Service'
  }
    return(
        <FormikContainer formParams={formParams}/>
    )
}