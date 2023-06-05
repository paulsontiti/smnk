
import {useRouter} from 'next/router'
import FormikContainer from '@/components/form/formikContainer'
import axios from 'axios'
import SendIcon from '@mui/icons-material/Send'
import {FormControls, FormParams, createFormObject } from '@/lib/form'
import { object, string } from 'yup'

function AdsForm() {
    const router = useRouter()
 //ad submit handler
 const adSubmitHandler = async (values:any)=>{
        try{
                    const res = await axios({
                        method:'POST',
                        url:`${process.env.SMNK_URL}api/multer/ads/create`,
                        data:values
                    })
                    const data = await res.data
                    alert(data.message)
                    if(data.successful){
                        router.push('/a-dashboard/ads')
                    }
      }catch(err:any){
        console.log(err)
        return err
      }
    }
         //formik submit handler
      const formikSubmitHandler = (values:any,formikHelpers:any,router:any)=>{
        if(values.imgName){
            const formData = new FormData()
        
            formData.append('adImg',values.imgName) 
            formData.append('title',values.title) 
            formData.append('description',values.description) 
            formData.append('landingPage',values.landingPage) 
        
            return new Promise(res=>{
             
                  formikHelpers.validateForm().then(async (data:any)=>{
                    adSubmitHandler(formData)
                      res(data)
                  }).catch((err:any)=>{
                    console.log('Error from formik ',err)
                    res(err)
                  })    
                 
            })
        
        }else{
            alert('Please select an image')
        }
      
    
    }
    
    const initialValues={title:'',description:'',landingPage:''}
    const validationSchema = object({
      title:string().required('Title is required'),
      landingPage:string().required('Web Address is required'),
      description:string().required('Description is required'),
    })
    
        const adFormControls:FormControls[] = [
              {name:'title',label:'Title',control:'input',helperText:`What's the title of your Ad`},
              {name:'landingPage',label:'Landing Page',control:'input',helperText:`What's the Website Address/URL`},
              {name:'description',label:'Description',control:'textarea',helperText:`What's the description of your Ad`},
              {name:'imgName',label:'Upload an Image',control:'file',initiaValues:initialValues}
            ]
    
         const formParams:FormParams ={
              formObject : createFormObject(formikSubmitHandler,validationSchema,initialValues,adFormControls),
              buttonLabel:'Submit',
              headerTitle: `Create Ad`,
              startIcon:<SendIcon/>
            }

        
        return (
            <FormikContainer formParams={formParams}/>
          )
}

export default AdsForm