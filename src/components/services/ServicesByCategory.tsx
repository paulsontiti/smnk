import { fetchUsers } from '@/lib/search'
import { Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SWDetailsAccordion from '../accordion/SWDetailsAccordion'

function ServicesByCategory({category}:{category:string}) {
    const [talents,setTalent] = useState<any[]>([])

    useEffect(()=>{
        (
            async()=>{
                const data = await fetchUsers(category)
                setTalent(data)
            }
        )()
    },[category])
  if(talents && talents.length < 1) return <p></p>
  return (
   <Container>
        <Typography fontWeight={'bold'} textTransform={'capitalize'} mt={2} mb={2}>{category}</Typography>
       {
        talents.map((talent,i)=>(
            <SWDetailsAccordion sw={talent} key={i}/>
        ))
       }
   </Container>
  )
}

export default ServicesByCategory