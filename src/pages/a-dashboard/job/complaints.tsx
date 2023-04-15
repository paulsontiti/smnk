import AdminLayout from '@/admin/components/adminLayout'
import ComplaintComponent from '@/components/complaint/ComplaintComponent'
import { getAllComplaints } from '@/lib/complaint'
import React from 'react'
import useSWR from 'swr'


function Complaints() {
    const {data,error} = useSWR('getComplaints',getAllComplaints())

    if(error) return <AdminLayout><p>An Error occurred</p></AdminLayout>
    if(!data) return <AdminLayout><p>loading.....</p></AdminLayout>
    if(Array.isArray(data) && data.length < 1) return <AdminLayout><p>No Complaints Available.</p></AdminLayout>
  return (
    <AdminLayout>
        {
            Array.isArray(data) && data.map((d)=>(
                <ComplaintComponent key={d._id} complaint={d}/>
            ))
        }
        
    </AdminLayout>
  )
}

export default Complaints