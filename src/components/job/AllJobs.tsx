import { createSetFromArray, fetchJobs } from '@/lib/search'
import React, { useEffect, useState } from 'react'
import { Container, Typography } from '@mui/material'
import JobsByCategory from './JobsByCategory'

function AllJobs() {

    const [categories,setCategories] = useState<string[] | null>(null)

    useEffect(()=>{
        (
            async()=>{
                const data = await fetchJobs()
                setCategories(createSetFromArray(data.flat().sort()))
            }
        )()
    },[])
    if(!categories)return <p>loading....</p>
  if(categories.length < 1) return <p>No Jobs</p>
  return (
   <Container>
    <Typography fontWeight={'bold'} textTransform={'capitalize'} mt={5} mb={5}>All Jobs By Categories</Typography>
    {
        categories.map((category,i)=>(
          <JobsByCategory category={category} key={i}/>
        ))
    }
   </Container>
  )
}

export default AllJobs