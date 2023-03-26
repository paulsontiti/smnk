
import { Box, FormGroup, TextField ,Button} from "@mui/material";
import { Field, Form, Formik ,ErrorMessage} from "formik";
import { RootState} from '@/store';
import { useSelector} from 'react-redux';
import { useRouter } from "next/router";
import { individualInfoSchema, states, submitHandler } from "@/lib/utils/editInfo";
import axios from "axios";
import useSWR from 'swr'
import { getUserInfo } from "@/lib/utils/user";




export default function EditIndividualInfoForm(){
   
const router = useRouter()

const {_id} = useSelector((state:RootState)=>state.users.user)
   
      
    
const {data,error} = useSWR('getUserInfo',getUserInfo(_id))
if(error) return <p>Error ocurred</p>
if(!data) return <p>loading..............</p>




  //formik submit handler
  const formikSubmitHandler = (values:any,formikHelpers:any)=>{
      return new Promise(res=>{
        formikHelpers.validateForm().then(async (data:any)=>{
                const msg = await submitHandler(values,_id,router)
                res(msg)
              }).catch((err:any)=>{
                alert(err)
                res(err)
              })              
            })
            
          }
          
        
        return(
      
           <Formik 
                initialValues={data} 
                onSubmit={formikSubmitHandler} 
                validationSchema={individualInfoSchema}
                
        >
            
        {({values,errors,touched,isSubmitting,isValidating}) => (
         <Form>
           
             <Box marginBottom={2}  marginTop={2}>
             <FormGroup>
                 <Field name='firstName' as={TextField} label="First Name"/>
                 <ErrorMessage name="firstName"/>
             </FormGroup>
             </Box>
             <Box marginBottom={2}  marginTop={2}>
             <FormGroup>
                 <Field name='lastName' as={TextField} label="Last Name"/>
                 <ErrorMessage name="lastName"/>
             </FormGroup>
             </Box>
             <Box  marginBottom={2}>
             <FormGroup>
             <Field name='userName' as={TextField} label="User Name"/>
             <ErrorMessage name="userName"/>
             </FormGroup>
             </Box>
             <Box  marginBottom={2}>
             <FormGroup>
             <Field name='state' as={TextField} select label="State">
                  {states.map((value:any)=>(
                      <option key={value.id} selected={value.name === (data && data.state)} value={value.name}>{value.name}</option>
                  ))}
                  
             </Field>
             <ErrorMessage name="state"/>
             </FormGroup>
             </Box>
             <Box  marginBottom={2}>
             <FormGroup>
             <Field name='lga' as={TextField} select label="L.G.A" >
                  {states[0].lgas.map((value:any)=>(
                          <option key={value.id} selected={value.name === (data && data.lga)} value={value.name}>{value.name}</option>
                      ))}
             </Field>
             <ErrorMessage name="lga"/>
             </FormGroup>
             </Box>
             <Box  marginBottom={2}>
             <FormGroup>
             <Field name='address' as={TextField} label="Address"/>
             <ErrorMessage name="address"/>
             </FormGroup>
             </Box>
             <Box  marginBottom={2}>
             <FormGroup>
             <Field name='description' as={TextField} multiline minRows={10} label="Description"/>
             <ErrorMessage name="description"/>
             </FormGroup>
             </Box>
             
             <Button variant="contained" fullWidth type="submit" disabled={isSubmitting || isValidating}>Edit Info</Button>
             
         {/* <pre>{JSON.stringify(values,null,4)}</pre> */}
        
         </Form>
        )}
         
       </Formik>
      
    )
}