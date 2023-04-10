
import React,{useEffect,useState} from 'react'
import { RootState } from '@/store'
import {CardActions,Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Job } from '@/lib/types/job'

type ProposalStatus ={
    hasApplied:boolean,
    isApproved:boolean
}


function ApplyForJobButton({job}:{job:Job}) {
    const {user} = useSelector((state:RootState)=>state.users)

    const router = useRouter()

    const [status,setStatus] = useState<ProposalStatus>({} as ProposalStatus)

    useEffect(()=>{
       (
        async ()=>{
            
            try{
                if(job._id && user._id){
                    const res = await axios({
                        method:'POST',
                        url:`${process.env.SMNK_URL}api/users/proposal/jobs/has-applied`,
                        data:{jobId : job._id,userId:user._id}
                    })
                    const data = await res.data
                //console.log(data)
                    setStatus(data)
              }else{
                console.log('Invalid request')
              }
                
                
            }catch(err:any){
              console.log(err)
              return err
            }
           }
       )()
    },[job._id,user._id])
  return (
    <CardActions>
       {user && user.type === "skilled worker" && !status.hasApplied 
            ?
                    <Button 
                        variant='contained'
                        onClick={()=>{
                            router.push(`/sw-dashboard/job/${job._id}`)
                        }}
                    >Apply
                    </Button> 
            :
                    <>
                        {user && user.type === "skilled worker"  && status.isApproved 
                            ? 
                                <>
                                    <Button 
                                        variant='contained'
                                        size='small' onClick={()=>{
                                            router.push(`/report/${job._id}`)
                                        }}
                                    >Give Report
                                    </Button>
                                </>
                            :   <Button 
                                    variant='contained'
                                    size='small'
                                >Applied -- Not Approved Yet
                                </Button>
        }
                    </>
        }
        
       </CardActions>
  )
}

export default ApplyForJobButton