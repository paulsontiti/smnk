import { useRouter } from "next/router";
import Layout from "./layout";
import EditPersonalIndividualInfoForm from "./editIndividualInfo";
import { Box, Card, CardContent, CardHeader } from "@mui/material";


export default function EditPersonalIndividualInfo(){

    const router = useRouter()
  
    
    return(
        <Layout>
            <Box 
            >
                <Card >
                    <CardHeader title='Edit Personal Info'/>
                    <CardContent>
                        
                        <EditPersonalIndividualInfoForm/>
                    </CardContent>
                </Card>
             </Box>
        </Layout>
        
    )
}