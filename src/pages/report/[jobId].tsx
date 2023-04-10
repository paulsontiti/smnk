import Layout from '@/components/dashboard/layout'
import JobReportForm from '@/components/report/JobReport'
import { Job } from '@/lib/types/job'
import { RedirectUser } from '@/lib/utils/urls'
import { RootState } from '@/store'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function ReportPage() {

  const {user} = useSelector((state:RootState)=>state.users)

  const [job,setJob] = useState<Job>()
    
    useEffect(()=>{
        (
            async()=>{
                try{
                    const res = await axios({
                          method:'POST',
                          url:`${process.env.SMNK_URL}api/job/current-job/${user._id}`
                      })
                    const data = await res.data
                   setJob(data)
                    
                }catch(err:any){
                  console.log(err)
                  return err
                }
            }
        )()
    },[user._id])

    if(!job) return <p>loading....</p>
  return (
    <Layout>
        <JobReportForm jobId={job._id} senderId={user._id} url={RedirectUser(user)}/>
    </Layout>
  )
}

export default ReportPage