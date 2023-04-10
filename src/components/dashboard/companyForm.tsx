
import { Box, FormGroup, TextField ,Button} from "@mui/material";
import { Field, Form, Formik ,ErrorMessage} from "formik";
import { RootState} from '@/store';
import { useSelector} from 'react-redux';
import { CompanyInfo, User} from "@/lib/types/userInfo";
import axios from "axios";
import { companyInfoSchema, companyInfoValues } from "@/lib/utils/companyProfile";
import { FormControlObject, FormParams, createFormObject, states } from "@/lib/form";
import FormikContainer from "../form/formikContainer";
import { companyProfileSubmitHandler, profileFormControls } from "@/lib/company";


   
export default function CompanyForm({router}:{router:any}){

  const {user,} = useSelector((state:RootState)=>state.users)
    

  //formik submit handler
  const formikSubmitHandler = (values:any,formikHelpers:any)=>{
  
    return new Promise(res=>{
          formikHelpers.validateForm().then(async (data:any)=>{
              const msg = await companyProfileSubmitHandler(values,user,router,'api/company-profile/add-company-profile')
              res(msg)
          }).catch((err:any)=>{
            res(err)

          })              
    })

  }
  const formParams:FormParams ={
    formObject : createFormObject(formikSubmitHandler,companyInfoSchema,companyInfoValues,profileFormControls),
    buttonLabel:'Add Profile',
    headerTitle:'Create Your Company Profile'
  }
    return(
        <FormikContainer formParams={formParams}/>
    )
}