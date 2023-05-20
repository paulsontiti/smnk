import Layout from '@/components/dashboard/layout'
import JobDetailsComponent from '@/components/job/JobDetails'
import { RootState } from '@/store'
import { Typography } from '@mui/material'
import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'

function DoneJobsPage() {

    const [jobs,setJobs] = useState<any[]>()
    const [error,setError] = useState()
    const {_id} = useSelector((state:RootState)=>state.users.user)

    useEffect(()=>{
        (async()=>{
            try{
                if(_id ){
                    const res = await axios({
                        method:'POST',
                        url:`${process.env.SMNK_URL}api/job/done/${_id}`,
                    })
                    const data = await res.data
                //console.log(data)
                setJobs(data)
              }else{
                console.log('Invalid request')
              }
                
                
            }catch(err:any){
              console.log(err)
              setError(err)
            }
        })()
    })


    if(error) return <Layout><Typography sx={{
      margin:'1rem 1rem' 
    }}>Error occurred</Typography></Layout>
    if(Array.isArray(jobs) && jobs.length < 1) return <Layout><Typography sx={{
      margin:'1rem 1rem' 
    }}>No Done Jobs</Typography></Layout>

  return (
    <Layout>
        {
            Array.isArray(jobs) && jobs.map((job)=>(
                <JobDetailsComponent key={job._id} job={job}/>
            ))
        }
        
    </Layout>
  )
}

export default DoneJobsPage