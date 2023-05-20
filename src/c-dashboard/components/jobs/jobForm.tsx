import {FormikHelpers} from 'formik'
import { useRouter } from "next/router";
import {jobSchema } from "@/lib/types/job";
import FormikContainer from "@/components/form/formikContainer";
import {FormControls, FormParams, createFormObject, states } from '@/lib/form';
import { JobDetails } from "@/lib/job";



const jobCategory = ['Software','Web Development']

export default function JobForm({initialValues,_id,submitHandler,jobId}:
                                {initialValues:JobDetails,_id:string,jobId:string
                                  submitHandler:(userId:string,values:any,router:any,jobId:string)=>void}){

  const router = useRouter()
  
    const typeOptions = [
      {label:'Physical',value:'physical'},
      {label:'Online',value:'online'},
    ]
   
const validateDate = (startDate:Date,endDate:Date)=>{
  return endDate > startDate
}


  //formik submit handler
  const formikSubmitHandler = (values:JobDetails,{validateForm}:FormikHelpers<JobDetails>)=>{
   
        return new Promise(res=>{
          if(validateDate(values.startDate,values.endDate)){
                validateForm().then((data:any)=>{
                  submitHandler(_id,values,router,jobId)
                 res(data)
             }).catch((err:any)=>{
               console.log('Error from formik ',err)
               res(err)
             })
            }else{
              alert('Your End date should be greater than your Start Date')
              res('')
            }          
        })
    

  }

  const jobFormControls:FormControls[] =[
        {name:'title',label:'Title',control:'input',required:true,helperText:'Title of your job'},
        {name:'type',label:'Type Of Job',control:'radio',options:typeOptions},
        {name:'category',label:'Category',control:'freesolo',options:jobCategory,
          required:true,helperText:'Category of your job'
        },
        {name:'description',label:'Description',control:'textarea',required:true,helperText:'Describe of your job'},
        {name:'budget',label:'Budget',control:'number',
          required:true,helperText:'How much are you willing to pay for the job'},
        {name:'state',label:'State',control:'auto',options:states, 
          fieldToCheckAgainst:'type',helperText:'Which State will the job be done',valueOfFieldToCheckAgainst:'online'},
        {name:'lga',label:'L.G.A',control:'auto',options:states,
          fieldToCheckAgainst:'state',helperText:'Which L.G.A is the location',valueOfFieldToCheckAgainst:''},
        {name:'address',label:'Address',control:'input',fieldToCheckAgainst:'type',valueOfFieldToCheckAgainst:'online',
        helperText:'What address will the job take place?'},
        {name:'startDate',label:'Start Date',control:'date'},
        {name:'endDate',label:'End Date',control:'date'},
        {name:'agreeToTerms',label:'I agree to terms & conditions',control:'switch'},
    ]
  
    const formParams:FormParams ={
      formObject : createFormObject(formikSubmitHandler,jobSchema,initialValues,jobFormControls),
      buttonLabel:'Submit',
      headerTitle:'Provide Your Job Details'
    }
  
    return(
       <FormikContainer formParams={formParams}/>
    )
}