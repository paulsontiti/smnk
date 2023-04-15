
import JobDetailsComponent from '@/components/job/JobDetails'
import { JobDetails } from '@/lib/job'
import { Job, getRecommendedJobs } from '@/lib/types/job'
import { RootState } from '@/store'
import { Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import useSWR from 'swr'


function RecommendedJobs() {
    const {_id} = useSelector((state:RootState)=>state.users.user)
  const [jobs,setJobs] = useState<Job[][]>()

    useEffect(()=>{
      (
        async ()=>{
          try{
            if(_id){
              const res = await axios({
                method:'POST',
                url:`${process.env.SMNK_URL}api/sw-dashboard/jobs/recommended-jobs`,
                data:{_id}
            })
              const data = await res.data
            setJobs(data)
            }else{
              console.log('Invalid request')
            }
              
              
          }catch(err:any){
            console.log(err)
            return err
          }
         }
      )()
    },[_id])
    
    if(!jobs) return <p>loading......</p>
    if(jobs.length === 1 && jobs[0].length === 0) return <p>No Recommended Jobs. Please Upgrade to a higher package or add your profile and services</p>
    //console.log(jobs)
  return (
    <Box sx={{marginLeft:'1rem'}}>

      <h2>All Jobs</h2>
      {
        Array.isArray(jobs) && jobs.map((job)=>(
          job.map((j)=>(
            <JobDetailsComponent key={j._id} job={j}/>
          ))
        ))
      }
    </Box>
  )
}

export default RecommendedJobs