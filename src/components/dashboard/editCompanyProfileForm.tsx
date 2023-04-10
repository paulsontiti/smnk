
import { RootState,AppDispatch } from '@/store';
import { useSelector,useDispatch } from 'react-redux';
import { getCompanyProfile } from "@/lib/utils/user";
import useSWR from 'swr'
import FormikContainer from "../form/formikContainer";
import { FormParams, createFormObject } from "@/lib/form";
import { companyProfileSubmitHandler, profileFormControls } from "@/lib/company";
import { companyInfoSchema } from '@/lib/utils/companyProfile';


   
export default function EditCompanyProfileForm({router}:{router:any}){

  const {user} = useSelector((state:RootState)=>state.users)
  const dispatch = useDispatch<AppDispatch>()

  const {data,error} = useSWR('getCompProfile', getCompanyProfile(user._id))

if(error) return <p>Error occurred</p>
if(!data) return <p>loading....</p>

 //formik submit handler
 const formikSubmitHandler = (values:any,formikHelpers:any)=>{
  
  return new Promise(res=>{
        formikHelpers.validateForm().then(async (data:any)=>{
            const msg = await companyProfileSubmitHandler(values,user,router,'api/company-profile/edit-company-profile')
            res(msg)
        }).catch((err:any)=>{
          res(err)

        })              
  })

}
const formParams:FormParams ={
  formObject : createFormObject(formikSubmitHandler,companyInfoSchema,data,profileFormControls),
  buttonLabel:'Edit Profile',
  headerTitle:'Edit Your Company Profile'
}
  return(
      <FormikContainer formParams={formParams}/>
  )
}
