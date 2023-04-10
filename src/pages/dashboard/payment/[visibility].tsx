import Layout from "@/components/dashboard/layout";
import PaymentForUpgrade from "@/components/payment/PaymentForUpgrade";
import { useRouter } from "next/router";

export default function PaymentPage(){

    const router = useRouter()
    const packageName = router.query.visibility as string

    return(
        <Layout>
            <PaymentForUpgrade packageName={packageName}/>
        </Layout>
    )
}