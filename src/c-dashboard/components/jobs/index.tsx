import {Box, Typography} from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import useSWR from 'swr'
import {getJobsByClientId } from '@/lib/types/job'
import JobDetailsAccordion from '@/components/accordion/ClientJobDetailsAccordion'


export default function ClientJobsComponent(){

    const {_id} = useSelector((state:RootState)=>state.users.user)
    const {data,error} = useSWR('getjobs',getJobsByClientId(_id))

    const getDate = (date:Date | null)=> {
      return date && date.toString().slice(0,10)
    }

    if(error) return <p>An Error occurred</p>
    if(!Array.isArray(data)) return <p>loading.....</p>
    if(data.length < 1) return <Typography variant='body2' sx={{margin:'1rem 1rem'}}
                                >No Job Available. Please Create A Job</Typography>

   

    return(
         <Box>        
            <Typography sx={{margin:'1rem 1rem',fontWeight:'bold'}}>All Jobs</Typography>
            {data.map((job:any)=>{
                    return(
                        <JobDetailsAccordion key={job._id} job={job}/>
                    )
                   })
            }
            
        </Box>
        
    )
}