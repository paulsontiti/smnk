
import {Typography} from '@mui/material'
import useSWR from 'swr'
import {getAllJobs } from '@/lib/types/job'
import JobComponent from './JobComponent'
import JobsDetailsTable from './jobs/JobsDetailsTable'

export default function Jobs(){

    const {data,error} = useSWR('getjobs',getAllJobs())

    if(error) return <p>An Error occurred</p>
    if(!data) return <p>loading.....</p>
    if(data.length < 1) return <p>No Jobs Available.</p>

    return(
       <>
       <JobsDetailsTable jobs={data}/>
       </>
        
    )
}