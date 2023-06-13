import { fetchUsers } from '@/lib/search'
import { Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SWDetailsAccordion from '../accordion/SWDetailsAccordion'
import LoadingAlert from '../alerts/Loading'
import InfoAlert from '../alerts/Info'

function ServicesByCategory({category}:{category:string}) {
    const [talents,setTalent] = useState<any[] | null>(null)

    useEffect(()=>{
        (
            async()=>{
                const data = await fetchUsers(category)
                setTalent(data)
            }
        )()
    },[category])
    if(!talents) return <LoadingAlert/>
  if(talents && talents.length < 1) return <InfoAlert message='No Information available'/>
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