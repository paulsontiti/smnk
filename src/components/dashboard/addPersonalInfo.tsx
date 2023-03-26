
import Layout from "@/components/dashboard/layout";
import { Card,CardHeader, CardContent} from "@mui/material";
import { useRouter } from "next/router";
import IndividualForm from '@/components/dashboard/individualForm';


  
  
  export default function AddPersonalInfoForm(){

    const router = useRouter()
  
    return(
        <Layout>
         
<Card sx={{marginTop:'2rem'}}>
      <CardHeader title='Add Personal Info'/>
      <CardContent>
           <IndividualForm router={router}/> 
      </CardContent>
    </Card>

        </Layout>
    )
}