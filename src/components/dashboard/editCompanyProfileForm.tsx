
import { Box, FormGroup, TextField ,Button} from "@mui/material";
import { Field, Form, Formik ,ErrorMessage} from "formik";
import { RootState,AppDispatch } from '@/store';
import { useSelector,useDispatch } from 'react-redux';
import { CompanyInfo, LGA, State } from "@/lib/types/userInfo";
import { companyInfoSchema } from "@/lib/utils/companyProfile";
import { getCompanyProfile } from "@/lib/utils/user";
import axios from "axios";
import useSWR from 'swr'


   
export default function EditCompanyProfileForm({router}:{router:any}){

  const {user} = useSelector((state:RootState)=>state.users)
  const dispatch = useDispatch<AppDispatch>()

  const {data,error} = useSWR('getCompProfile', getCompanyProfile(user._id))

if(error) return <p>Error occurred</p>
if(!data) return <p>loading....</p>
    
  //sign up submit handler
  const submitHandler = async (values:CompanyInfo)=>{
                  
    if(user){
      try{
        const res = await axios({
              method:'POST',
              url:`${process.env.SMNK_URL}api/company-profile/edit-company-profile`,
              data:values
          })
        const data = await res.data
        alert(data.message)
        if(data.profileEdited && user && user.typeClass === 'Company'){
          router.push('/dashboard/company')
        }else if(data.profileEdited && user && user.typeClass === 'Individual'){
            router.push('/dashboard/individual')
          }
        
    }catch(err:any){
      console.log(err)
      alert(err.response.data.message)
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
        <Formik initialValues={data} onSubmit={formikSubmitHandler} validationSchema={companyInfoSchema}>
            
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
             
         {/* <pre>{JSON.stringify(values,null,4)}</pre> */}
        
         </Form>
        )}
         
       </Formik>
    )
}