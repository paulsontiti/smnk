
import { useRouter } from "next/router";
import { Job, createJobSubmitHandler, jobSchema } from "@/lib/types/job";
import FormikContainer from "@/components/form/formikContainer";
import { FormControlObject, FormControls, FormParams, createFormObject, states } from '@/lib/form';




export default function JobForm({initialValues,_id,buttonLabel,submitHandler}:
                                {initialValues:Job,_id:string,buttonLabel:string,
                                  submitHandler:(_id:string,values:any,router:any)=>void}){

  const router = useRouter()
  
    const typeOptions = [
      {key:'Physical',value:'physical'},
      {key:'Online',value:'online'},
    ]
   
  //formik submit handler
  const formikSubmitHandler = (values:any,formikHelpers:any)=>{
   
        return new Promise(res=>{
          if(values.startDate < values.endDate){
              formikHelpers.validateForm().then(async (data:any)=>{
                   submitHandler(_id,values,router)
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
        {name:'title',label:'Title',control:'input'},
        {name:'type',label:'Type Of Job',control:'radio',options:typeOptions},
        {name:'category',label:'Category',control:'input'},
        {name:'description',label:'Description',control:'textarea'},
        {name:'budget',label:'Budget',control:'input',type:'number'},
        {name:'state',label:'State',control:'select',options:states, fieldToCheckAgainst:'type'},
        {name:'lga',label:'L.G.A',control:'select',options:states,fieldToCheckAgainst:'state'},
        {name:'address',label:'Address',control:'input',fieldToCheckAgainst:'type'},
        {name:'startDate',label:'Start Date',control:'date'},
        {name:'endDate',label:'End Date',control:'date'},
        {name:'agreeToTerms',label:'agree to terms & conditions',control:'checkbox'},
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