import Layout from '@/components/dashboard/layout'
import JobDetailsComponent from '@/components/job/JobDetails'
import { Job } from '@/lib/types/job'
import { RootState } from '@/store'
import { Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'


function CurrentJobPage() {
    const {_id} = useSelector((state:RootState)=>state.users.user)

    const [job,setJob] = useState<Job>()
    
    useEffect(()=>{
        (
            async()=>{
                try{
                    const res = await axios({
                          method:'POST',
                          url:`${process.env.SMNK_URL}api/job/current-job/${_id}`
                      })
                    const data = await res.data
                   setJob(data)
                    
                }catch(err:any){
                  console.log(err)
                  return err
                }
            }
        )()
    },[_id])
    if(!job) return (
    <Layout>
      <Typography variant='body2' sx={{margin:'1rem 1rem'}}>No current Job</Typography>
    </Layout>
    )
   
  return (
    <Layout>
        <JobDetailsComponent job={job as Job}/>
    </Layout>
  )
}

export default CurrentJobPage