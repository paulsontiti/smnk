import Layout from "@/components/dashboard/layout";
import Payment from "@/components/dashboard/payment";
import { useRouter } from "next/router";

export default function PaymentPage(){

    const router = useRouter()
    const {query:{visibility}} = router
    console.log(visibility)
    return(
        <Layout>
            <Payment/>
        </Layout>
    )
}