import Layout from '@/components/dashboard/layout'
import { useRouter } from 'next/router'
import UserBankDetails from '@/components/pay-sw'
import ErrorAlert from '@/components/alerts/Error'

function TipSkilleWorker() {
    const router = useRouter()
    const id = router.query.userId as string

    
if(!id) return <ErrorAlert/>
  return (
    <Layout>
        <UserBankDetails userId={id}/>
    </Layout>
  )
}

export default TipSkilleWorker