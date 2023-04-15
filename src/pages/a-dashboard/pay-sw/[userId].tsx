import AdminLayout from '@/admin/components/adminLayout'
import UserBankDetails from '@/components/pay-sw'
import { useRouter } from 'next/router'
import React from 'react'
import {Button} from '@mui/material'

function Pay() {
    const router = useRouter()
    const id = router.query.userId as string
  return (
    <AdminLayout>
        <UserBankDetails userId={id}/>
        <Button size='small' variant='contained' onClick={()=>{
          router.push(`/message/${id}`) 
        }}>Message SW</Button>
    </AdminLayout>
  )
}

export default Pay