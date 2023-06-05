import { useRouter } from "next/router";
import { Service,serviceDetailsSchema,serviceSubmitHandler } from "@/lib/types/service";
import { FormControls, FormParams, createFormObject } from "@/lib/form";
import FormikContainer from "@/components/form/formikContainer";
import { updateUser } from "@/store/slices/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useEffect, useState } from "react";
import { fetchTalents } from "@/lib/search";



export default function AddServiceForm(){
const [options,setOptions] = useState<any[]>([])
  const dispatch = useDispatch<AppDispatch>()

  const router = useRouter()
  useEffect(()=>{
(
  async()=>{
    const data = await fetchTalents()
    const setOption = new Set(data.flat())
      const options:any[] = []
      setOption.forEach((val)=>{
       options.push(val)
      })
    setOptions(options)
  }
)()
  },[])
      
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
  const serviceFormControls: FormControls[] = [
    { name: "title", label: "Service Title", control: "input" },
    { name: "skills[0]", label: "Skill One", control: "input" },
    { name: "skills[1]", label: "Skill Two", control: "input" },
    { name: "category", label: "Category", control: "freesolo",options:options },
    { name: "description", label: "Service Description", control: "textarea" },
  ];

  const formParams:FormParams ={
    formObject : createFormObject(formikSubmitHandler,serviceDetailsSchema,initialValues,serviceFormControls),
    buttonLabel:'Add Service',
    headerTitle:'Add Your Service'
  }
    return(
        <FormikContainer formParams={formParams}/>
    )
}