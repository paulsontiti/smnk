
import { Box, FormGroup, TextField ,Button} from "@mui/material";
import { Field, Form, Formik ,ErrorMessage} from "formik";
import { RootState} from '@/store';
import { useSelector } from 'react-redux';
import { useRouter } from "next/router";
import {useState,useEffect} from 'react'
import { Service, addEditService, serviceDetailsSchema } from "@/lib/types/service";
import axios from "axios";
import { BankDetails, addEditBankDetails, bankDetailsSchema } from "@/lib/types/bank-details";




export default function EditBankDetailsForm({initialValues,id}:{initialValues:any,id:string}){

  const router = useRouter()
  

  const {_id} = useSelector((state:RootState)=>state.users.user)
   const [bankDetails,setBankDetails] = useState(initialValues)
    
    useEffect(()=>{
       
        setBankDetails(initialValues)
        
    },[initialValues])



//add experience submit handler
const submitHandler = async (values:BankDetails)=>{
    //values.userId= _id
   //return  console.log(values)
    if(_id){
      const data:any = await addEditBankDetails(values,axios,'edit-bank-details')
      if(data.isBankDetailsEdited){
        alert(data.message)
        router.push('/sw-dashboard/bank-details')
      }else{
        alert(data.message)
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
            console.log('Error from formik ',err)
            res(err)
          })              
    })

  }


    return(
        <Formik initialValues={bankDetails} onSubmit={formikSubmitHandler} validationSchema={bankDetailsSchema}>
            
        {({values,errors,touched,isSubmitting,isValidating}) => (
         <Form>
           
             <Box marginBottom={2}  marginTop={2}>
             <FormGroup>
                 <Field name='accountName' as={TextField} label="Account Name"/>
                 <ErrorMessage name="accountName"/>
             </FormGroup>
             </Box>
            
             <Box  marginBottom={2}>
             <FormGroup>
             <Field name='accountNumber' as={TextField} label="AccountNumber" type='number'/>
             <ErrorMessage name="accountNumber"/>
             </FormGroup>
            </Box>
            
             <Box  marginBottom={2}>
             <FormGroup>
             <Field name='bankName' as={TextField} label="Bank Name"/>
             <ErrorMessage name="bankName"/>
             </FormGroup>
             </Box>
            
             <Button variant="contained" fullWidth type="submit" disabled={isSubmitting || isValidating}>Edit Bank Details</Button>
             
         {/* <pre>{JSON.stringify(values,null,4)}</pre> */}
        
         </Form>
        )}
         
       </Formik>
    )
}