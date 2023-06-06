import { createSetFromArray, fetchTalents } from '@/lib/search'
import React, { useEffect, useState } from 'react'
import ServicesByCategory from './ServicesByCategory'
import { Container, Typography } from '@mui/material'

function AllServices() {

    const [services,setServices] = useState<any[] | null>(null)

    useEffect(()=>{
        (
            async()=>{
                const data = await fetchTalents()
                setServices(createSetFromArray(data.flat().sort()))
            }
        )()
    },[])
    if(!services) return <p>loading</p>
  if(services.length < 1) return <p>No Services</p>
  return (
   <Container>
    <Typography fontWeight={'bold'} textTransform={'capitalize'} mt={5} mb={5}>All Services By Categories</Typography>
    {
        services.map((serv,i)=>(
           <ServicesByCategory category={serv} key={i}/>
        ))
    }
   </Container>
  )
}

export default AllServices