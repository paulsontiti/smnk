import ErrorAlert from '@/components/alerts/Error'
import InfoAlert from '@/components/alerts/Info'
import Layout from '@/components/dashboard/layout'
import ReportComponent from '@/components/report/ReportComponent'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function JobReportsPage() {

    const router = useRouter()
    const id = router.query.jobId as string
    const [reports,setReports] = useState<any[]>()
    const [error,setError] = useState()
    
    useEffect(()=>{
        (
            async()=>{
                try{
                    const res = await axios({
                          method:'GET',
                          url:`${process.env.SMNK_URL}api/report/${id}`
                      })
                    const data = await res.data
                   setReports(data)
                    
                }catch(err:any){
                  console.log(err)
                  setError(err)
                }
            }
        )()
    },[id])

    if(error) return <Layout><ErrorAlert/></Layout>
    if(Array.isArray(reports) && reports.length === 0) return <Layout><InfoAlert message='No Reports Yet'/></Layout>
  return (
    <Layout>
       {
            Array.isArray(reports) && reports.map((report,i)=>(
                <ReportComponent key={i} report={report}/>
            ))
       }
    </Layout>
    
  )
}

export default JobReportsPage