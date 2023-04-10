
import Layout from "@/components/dashboard/layout";
import { useRouter } from "next/router";
import CompanyForm from './companyForm';

  
  
  export default function AddCompanyProfile(){

    const router = useRouter()
   
    return(
        <Layout>
           <CompanyForm router={router}/> 
        </Layout>
    )
}