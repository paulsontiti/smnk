import { fetchSearchJobs } from '@/lib/search'
import { Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchedJobDetailsAccordion from '../accordion/SearchedJobDetailsAccordion'

function JobsByCategory({category}:{category:string}) {
    const [jobs,setJobs] = useState<any[]>([])

    useEffect(()=>{
        (
            async()=>{
                const data = await fetchSearchJobs(category)
                setJobs(data)
            }
        )()
    },[category])
  if(jobs && jobs.length < 1) return <p></p>
  return (
   <Container>
        <Typography fontWeight={'bold'} textTransform={'capitalize'} mt={2} mb={2}>{category}</Typography>
       {
        jobs.map((job,i)=>(
           <SearchedJobDetailsAccordion job={job} key={i}/>
        ))
       }
   </Container>
  )
}

export default JobsByCategory