
import { AppDispatch} from '@/store';
import { useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import {bankDetailsFormControls, bankDetailsSchema, bankDetailsSubmitHandler } from "@/lib/types/bank-details";
import FormikContainer from "@/components/form/formikContainer";
import { FormParams, createFormObject } from "@/lib/form";
import { updateUser } from '@/store/slices/userSlice';
import { SnackBarParams } from '@/lib/types/service';
import { useRef, useState } from 'react';
import { AlertColor } from "@mui/material";
import SnackbarComponent from '@/components/snackbar/SnackBar';



export default function EditBankDetailsForm(){

  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const dispatch = useDispatch<AppDispatch>();

  //declare refs
  const snackBarRef = useRef();
  const router = useRouter()

    //formik submit handler
    const formikSubmitHandler = (values:any,formikHelpers:any)=>{
  
      if(values.userId){
        return new Promise(res=>{
              formikHelpers.validateForm().then(async (data:any)=>{
                const snackbarParams: SnackBarParams = {
                  setMsg,
                  setColor,
                  snackBarRef,
                };
                  const msg = await bankDetailsSubmitHandler(values,router,snackbarParams)
                  //update user object in localstorage
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
  const initialValues = {}
  
    const formParams:FormParams ={
      formObject : createFormObject(formikSubmitHandler,bankDetailsSchema,initialValues,bankDetailsFormControls),
      buttonLabel:'Edit Bank Details',
      headerTitle:'Edit Your Bank Details'
    }
    return (
      <>
        <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
        <FormikContainer formParams={formParams} />
      </>
    );
  
}