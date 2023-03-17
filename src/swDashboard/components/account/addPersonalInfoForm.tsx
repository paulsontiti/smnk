import {useState} from 'react'
import RadioButtonGroup from "@/components/radioButtonGroup";
import Layout from "@/swDashboard/components/layout";
import { Box,Card,CardHeader, CardContent} from "@mui/material";
import { useRouter } from "next/router";
import IndividualForm from '@/swDashboard/components/account/individualForm';
import CompanyForm from './companyForm';

  
  
  export default function AddPersonalInfoForm(){

    const router = useRouter()
       
    const [type,setType] = useState('Individual')
  
  const setValue=(value:string)=>{
    setType(value)
  }

    return(
        <Layout>
         
<Card sx={{marginTop:'2rem'}}>
      <CardHeader title='Add Personal Info'/>
      <CardContent>
            <Box  marginBottom={2}>
                <RadioButtonGroup setTypeValue={(val:string)=>{setValue(val)}} radios={['Individual','Company']}/>
            </Box>
            
             {type === 'Individual' ? <IndividualForm router={router} type={type}/> : <CompanyForm/>}
      </CardContent>
    </Card>

        </Layout>
    )
}