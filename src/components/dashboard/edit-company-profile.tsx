import { useRouter } from "next/router";
import Layout from "./layout";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import EditCompanyProfileForm from "./editCompanyProfileForm";


export default function EditCompanyProfile(){

    const router = useRouter()
  
    
    return(
        <Layout>
            <Box 
            >
                <Card >
                    <CardHeader title='Edit Your Company Profile'/>
                    <CardContent>
                        
                        <EditCompanyProfileForm router={router}/>
                    </CardContent>
                </Card>
             </Box>
        </Layout>
        
    )
}