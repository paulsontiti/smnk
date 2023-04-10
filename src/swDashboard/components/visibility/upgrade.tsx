import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

export const Upgrade = ({visibility,packageName}:{visibility:string,packageName:string}) => {
    const router = useRouter()
  return (
    <Button onClick={
        ()=>{
            router.push(`/dashboard/payment/${visibility}`)
        }
    } size='small' fullWidth color='success' variant='contained' disabled={visibility.toLocaleLowerCase() === packageName.toLocaleLowerCase()}>
        {visibility.toLocaleLowerCase() === packageName.toLocaleLowerCase() ? 'subscribed' : 'Upgrade'}
      </Button>
  )
}
