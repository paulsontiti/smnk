import { useRouter } from "next/router";
import { Service,SnackBarParams,serviceDetailsSchema,serviceSubmitHandler } from "@/lib/types/service";
import { FormControls, FormParams, createFormObject } from "@/lib/form";
import FormikContainer from "@/components/form/formikContainer";
import { updateUser } from "@/store/slices/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import {useEffect, useRef, useState } from "react";
import { createSetFromArray, fetchTalents } from "@/lib/search";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { AlertColor } from "@mui/material";



export default function AddServiceForm(){
const [options,setOptions] = useState<any[]>([])
const [msg, setMsg] = useState("");
const [color, setColor] = useState<AlertColor>("error");
const dispatch = useDispatch<AppDispatch>();

  //declare refs
  const snackBarRef = useRef();
    

  const router = useRouter()
  useEffect(()=>{
(
  async()=>{
    const data = await fetchTalents()
    setOptions(createSetFromArray(data.flat()))
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
              const snackbarParams:SnackBarParams = {setMsg,setColor,snackBarRef}
                const msg = await serviceSubmitHandler(values,router,snackbarParams)
                dispatch(updateUser())
                res(msg)
            }).catch((err:any)=>{
              setMsg(err.message);
              setColor("error");
               const refState = snackBarRef.current as any;
               refState.handleClick();
              console.log('Error from formik ',err)
              res(err)
            })              
      })
    }else{
      setMsg('Invalid request!!');
              setColor("error");
               const refState = snackBarRef.current as any;
               refState.handleClick();
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
  return (
    <>
    <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer formParams={formParams} />
    </>
  );
}