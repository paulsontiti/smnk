
import { RootState} from '@/store';
import { useSelector } from 'react-redux';
import { useRouter } from "next/router";
import {bankDetailsFormControls, bankDetailsSchema, bankDetailsSubmitHandler } from "@/lib/types/bank-details";
import FormikContainer from "@/components/form/formikContainer";
import { FormParams, createFormObject } from "@/lib/form";




export default function EditBankDetailsForm({initialValues}:{initialValues:any}){

  const router = useRouter()

    //formik submit handler
    const formikSubmitHandler = (values:any,formikHelpers:any)=>{
  
      if(values.userId){
        return new Promise(res=>{
              formikHelpers.validateForm().then(async (data:any)=>{
                  const msg = await bankDetailsSubmitHandler(values,router,'api/sw-dashboard/bank-details/edit-bank-details')
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
      formObject : createFormObject(formikSubmitHandler,bankDetailsSchema,initialValues,bankDetailsFormControls),
      buttonLabel:'Edit Bank Details',
      headerTitle:'Edit Your Bank Details'
    }
      return(
          <FormikContainer formParams={formParams}/>
      )
  
}