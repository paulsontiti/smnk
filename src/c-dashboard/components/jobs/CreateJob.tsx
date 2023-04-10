import React from 'react'
import JobForm from './jobForm'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Job, createJobSubmitHandler } from '@/lib/types/job'

function CreateJob() {

    const {_id} = useSelector((state:RootState)=>state.users.user)


    const initialValues :Job={
        title:'',
        type:'',
        category:'',
        state:'',
        lga:'',
        address:'',
        description:'',
        budget:0,
        startDate: null,
        endDate: null,
        agreeToTerms:false,
        userId:_id,
        _id:''
          
        }
  return (
    <JobForm initialValues={initialValues} _id={_id} buttonLabel='Create Job'
     submitHandler={createJobSubmitHandler}/>
  )
}

export default CreateJob