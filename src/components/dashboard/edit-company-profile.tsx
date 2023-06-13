import { useRouter } from "next/router";
import Layout from "./layout";
import EditCompanyProfileForm from "./editCompanyProfileForm";


export default function EditCompanyProfile(){

    const router = useRouter()
  
    
    return(
        <Layout>
            
            <EditCompanyProfileForm router={router}/>
        </Layout>
        
    )
}