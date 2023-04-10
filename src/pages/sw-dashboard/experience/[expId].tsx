import {useEffect} from 'react'
import Layout from "@/components/dashboard/layout";
import { useRouter } from "next/router";
import EditExperience from "@/swDashboard/components/account/editExperience";

export default function EditExperiencePage(){

    const router = useRouter()

const id = router.query.expId as string

useEffect(()=>{
    if(!id){
        router.push('/sw-dashboard/experience/')
    }
},[id,router])
    return(

       <Layout>
        <EditExperience router={router} expId={id}/>
       </Layout>
    )
}