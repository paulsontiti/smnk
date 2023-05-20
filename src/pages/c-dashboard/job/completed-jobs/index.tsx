import ClientJobDetailsAccordion from '@/components/accordion/ClientJobDetailsAccordion'
import Layout from '@/components/dashboard/layout'
import { Job } from '@/lib/types/job'
import { RootState } from '@/store'
import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'

function CompletedJobsPage() {
const {_id} = useSelector((state:RootState)=>state.users.user)

    const [completedJobs,setCompletedJobs] = useState<Job[]>()
    const [error,setError] = useState()

    useEffect(()=>{
        (
            async()=>{
                try{
                    if(_id ){
                        const res = await axios({
                            method:'GET',
                            url:`${process.env.SMNK_URL}api/job/completed-jobs/${_id}`,
                        })
                        const data = await res.data
                    //console.log(data)
                    setCompletedJobs(data)
                  }else{
                    console.log('Invalid request')
                  }
                    
                    
                }catch(err:any){
                  console.log(err)
                  setError(err)
                }
            }
        )()
    },[_id])

    if(error) <Layout><p>Error occurred</p></Layout>
    if(!completedJobs) <Layout><p>loading</p></Layout>
    if(Array.isArray(completedJobs) && completedJobs.length === 0) <Layout><h4>No Completed Jobs</h4></Layout>
  return (
    <Layout>
        {
            Array.isArray(completedJobs) && completedJobs.map((job,i)=>(
                <ClientJobDetailsAccordion key={i} job={job}/>
            ))
        }
    </Layout>
  )
}

export default CompletedJobsPage