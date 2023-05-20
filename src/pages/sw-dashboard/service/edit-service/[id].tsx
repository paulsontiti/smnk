import EditService from "@/swDashboard/components/account/service/editService";
import {useEffect} from 'react'
import Layout from "@/components/dashboard/layout";
import { useRouter } from "next/router";

export default function EditServicePage(){

    const router = useRouter()

const id = router.query.id as string

useEffect(()=>{
    if(!id){
        router.push('/sw-dashboard/service/')
    }
},[id,router])
    return(

        <Layout>
            <EditService index={Number(id)}/>
        </Layout>
    )
}