
import { Box, FormGroup, TextField ,Button} from "@mui/material";
import { Field, Form, Formik ,ErrorMessage} from "formik";
import { RootState} from '@/store';
import { useSelector} from 'react-redux';
import { CompanyInfo} from "@/lib/types/userInfo";
import axios from "axios";
import { companyInfoSchema, companyInfoValues } from "@/lib/utils/companyProfile";


   
export default function CompanyForm({router}:{router:any}){

  const {user,} = useSelector((state:RootState)=>state.users)
    
  //sign up submit handler
  const submitHandler = async (values:CompanyInfo)=>{
    values.userId = user._id
        if(values.userId){
          try{
                  const res = await axios({
                        method:'POST',
                        url:`${process.env.SMNK_URL}api/company-profile/add-company-profile`,
                        data:values
                    })
                  const data = await res.data
                  console.log(data)
                    alert(data.message)
                    if(data.profileAdded && user && user.typeClass === 'Company'){
                          router.push('/dashboard/company')
                        }else if(data.profileAdded && user && user.typeClass === 'Individual'){
                            router.push('/dashboard/individual')
                          }
              }catch(err:any){
                alert(err.response.data.message)
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
            res(err)

          })              
    })

  }


    return(
        <Formik initialValues={companyInfoValues} onSubmit={formikSubmitHandler} validationSchema={companyInfoSchema}>
            
        {({values,errors,touched,isSubmitting,isValidating}) => (
         <Form>
           
             <Box marginBottom={2}  marginTop={2}>
             <FormGroup>
                 <Field name='name' as={TextField} label="Company Name"/>
                 <ErrorMessage name="name"/>
             </FormGroup>
             </Box>
             <Box marginBottom={2}  marginTop={2}>
             <FormGroup>
                 <Field name='email' type='email' as={TextField} label="Company Email"/>
                 <ErrorMessage name="email"/>
             </FormGroup>
             </Box>
             
             <Box  marginBottom={2}>
             <FormGroup>
             <Field name='state' as={TextField} select label="State">
                  <option  value='Abia'>Abia</option>                  
             </Field>
             <ErrorMessage name="state"/>
             </FormGroup>
             </Box>
             <Box  marginBottom={2}>
             <FormGroup>
             <Field name='lga' as={TextField} select label="L.G.A">
                   <option  value='Abia North'>Abia North</option>
                   <option  value='Abia South'>Abia South</option>
                   <option  value='Abia East'>Abia East</option>
                   <option  value='Abia West'>Abia West</option>
             </Field>
             <ErrorMessage name="lga"/>
             </FormGroup>
             </Box>
             <Box  marginBottom={2}>
             <FormGroup>
             <Field name='officeAddress' as={TextField} label="Office Address"/>
             <ErrorMessage name="officeAddress"/>
             </FormGroup>
             </Box>
             <Box  marginBottom={2}>
             <FormGroup>
             <Field name='description' as={TextField} multiline minRows={10} label="Description"/>
             <ErrorMessage name="description"/>
             </FormGroup>
             </Box>
            
             <Button variant="contained" fullWidth type="submit" disabled={isSubmitting || isValidating}>Add</Button>
             
         <pre>{JSON.stringify(values,null,4)}</pre>
        
         </Form>
        )}
         
       </Formik>
    )
}