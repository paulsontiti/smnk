import EditBankDetails from "@/swDashboard/components/account/bank-details/editBankDetails";
import Layout from "@/components/dashboard/layout";
import {useEffect} from 'react'
import { useRouter } from "next/router";


export default function EditBankDetailsPage(){

    const router = useRouter()

    const id = router.query.id as string
    
    useEffect(()=>{
        if(!id){
            router.push('/sw-dashboard/bank-details')
        }
    },[id,router])

    return(
        <Layout>
            <EditBankDetails id={id}/>
        </Layout>
    )
}