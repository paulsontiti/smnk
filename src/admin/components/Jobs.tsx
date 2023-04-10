
import {Typography} from '@mui/material'
import useSWR from 'swr'
import {getAllJobs } from '@/lib/types/job'
import JobComponent from './JobComponent'

export default function Jobs(){

    const {data,error} = useSWR('getjobs',getAllJobs())

    if(error) return <p>An Error occurred</p>
    if(!Array.isArray(data)) return <p>loading.....</p>
    if(data.length < 1) return <p>No Jobs Available.</p>

    return(
       <>
       <Typography sx={{fontSize:'2rem', fontWeight:'bold'}}>All Jobs</Typography>
            {data.map((job,i)=>(
                <JobComponent job={job} key={i}/>
            ))}
       </>
        
    )
}