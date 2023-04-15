import AdminLayout from '@/admin/components/adminLayout'
import ClientDetails from '@/components/client/ClientDetails'
import { getAllClients } from '@/lib/clients'
import React from 'react'
import useSWR from 'swr'

function Clients() {

    const {data,error} = useSWR('getClients',getAllClients())

    if(error) return <AdminLayout><p>An Error occurred</p></AdminLayout>
    if(!data) return <AdminLayout><p>loading.....</p></AdminLayout>
    if(Array.isArray(data) && data.length < 1) return <AdminLayout><p>No Clients Available.</p></AdminLayout>
    //console.log(data)
  return (
    <AdminLayout>
        {
            Array.isArray(data) && data.map((d)=>(
                <ClientDetails key={d._id} client={d}/>
            ))
        }
    </AdminLayout>
  )
}

export default Clients