import { useRouter } from "next/router";
import Layout from "../layout";
import EditPersonalIndividualInfoForm from "./editIndividualInfoForm";
import { useState } from "react";
import RadioButtonGroup from "@/components/radioButtonGroup";
import { Box, Card, CardContent, CardHeader } from "@mui/material";


export default function EditPersonalIndividualInfo(){

    const router = useRouter()
    const [type,setType] = useState('Individual')
  
    const setValue=(value:string)=>{
      setType(value)
    }
    
    return(
        <Layout>
            <Box 
            >
                <Card >
                    <CardHeader title='Edit Personal Info'/>
                    <CardContent>
                        <Box  marginBottom={2}>
                            <RadioButtonGroup setTypeValue={(val:string)=>{setValue(val)}} radios={['Individual','Company']}/>
                        </Box>
                        <EditPersonalIndividualInfoForm router={router} type={type}/>
                    </CardContent>
                </Card>
             </Box>
        </Layout>
        
    )
}