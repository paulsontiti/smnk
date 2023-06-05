import AdminLayout from '@/admin/components/adminLayout'
import AdsForm from '@/admin/components/ads/AdsForm'

import { Container } from '@mui/material'
import React from 'react'

function CreateAdsPage() {

  
  return (
   <AdminLayout>
    <Container fixed sx={{
        display:'flex',alignItems:'center',justifyContent:'center', width:600
    }}>
      <AdsForm/>
   </Container>
   </AdminLayout>
  )
}

export default CreateAdsPage