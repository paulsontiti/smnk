import {useState} from 'react'
import Layout from "@/components/dashboard/layout";
import { Card,CardHeader, CardContent} from "@mui/material";
import { useRouter } from "next/router";
import CompanyForm from './companyForm';

  
  
  export default function AddCompanyProfile(){

    const router = useRouter()
   
    return(
        <Layout>
         
<Card sx={{marginTop:'2rem'}}>
      <CardHeader title='Add Your Company Info'/>
      <CardContent>
           <CompanyForm router={router}/> 
      </CardContent>
    </Card>

        </Layout>
    )
}