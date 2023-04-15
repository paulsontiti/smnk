import AdminLayout from '@/admin/components/adminLayout'
import SWDetails from '@/components/sw/SWDetails'
import { getAllSkilledWorkers } from '@/lib/sw'
import React from 'react'
import useSWR from 'swr'

function SW() {

    const {data,error} = useSWR('getSW',getAllSkilledWorkers())

    if(error) return <AdminLayout><p>An Error occurred</p></AdminLayout>
    if(!data) return <AdminLayout><p>loading.....</p></AdminLayout>
    if(Array.isArray(data) && data.length < 1) return <AdminLayout><p>No Skilled Workers Available.</p></AdminLayout>
    //console.log(data)
  return (
    <AdminLayout>
        {
            Array.isArray(data) && data.map((d)=>(
                <SWDetails key={d._id} sw={d}/>
            ))
        }
    </AdminLayout>
  )
}

export default SW