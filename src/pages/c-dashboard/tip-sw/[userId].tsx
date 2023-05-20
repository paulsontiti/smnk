import Layout from '@/components/dashboard/layout'
import { useRouter } from 'next/router'
import UserBankDetails from '@/components/pay-sw'

function TipSkilleWorker() {
    const router = useRouter()
    const id = router.query.userId as string

    

  return (
    <Layout>
        <UserBankDetails userId={id}/>
    </Layout>
  )
}

export default TipSkilleWorker