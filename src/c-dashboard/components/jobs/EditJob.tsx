import React from 'react'
import JobForm from './jobForm'
import { Job, editJobSubmitHandler, getJobByJobId } from '@/lib/types/job'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import useSWR from 'swr'


function EditJob({jobId}:{jobId:string}) {

    const {_id} = useSelector((state:RootState)=>state.users.user)
    const {data,error} = useSWR('getAJob',getJobByJobId(jobId))

    if(error) return <p>Error occurred</p>
    if(!data) return <p>loading.....</p>
    
    
    const initialValues = data
  return (
    <JobForm initialValues={initialValues} _id={_id} buttonLabel='Edit Job' submitHandler={editJobSubmitHandler}/>
  )
}

export default EditJob