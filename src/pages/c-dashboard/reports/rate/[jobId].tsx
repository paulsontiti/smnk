import Layout from '@/components/dashboard/layout'
import RatingComponent from '@/components/rating/RatingComponent'
import { useRouter } from 'next/router'
import React from 'react'

function RatingPage() {

  const router = useRouter()
  const id = router.query.jobId as string
  return (
    <Layout>
        <RatingComponent jobId={id}/>
    </Layout>
    
  )
}

export default RatingPage