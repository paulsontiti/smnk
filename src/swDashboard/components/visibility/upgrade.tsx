import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

export const Upgrade = ({visibility}:{visibility:string}) => {
    const router = useRouter()
  return (
    <Button onClick={
        ()=>{
            router.push(`/dashboard/payment/${visibility}`)
        }
    } fullWidth color='success' variant='contained'>Upgrade</Button>
  )
}
