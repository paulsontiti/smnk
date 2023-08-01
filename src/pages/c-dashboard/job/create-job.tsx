
import CreateJob from '@/c-dashboard/components/jobs/CreateJob'
import Layout from '@/components/dashboard/layout'
import { RootState } from '@/store';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import {useRouter} from 'next/router'

function CreateJobPage() {
  const { _id, type } = useSelector((state: RootState) => state.users.user);
  const router = useRouter();
  useEffect(()=>{
    if (!_id || type !== "client") {
      router.push("/");
    }
  },[router,_id,type])
  return (
    <Layout>
        <CreateJob/>
    </Layout>
  )
}

export default CreateJobPage