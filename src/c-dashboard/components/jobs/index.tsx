import {Box, Card, CardContent,CardActions} from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import useSWR from 'swr'
import { Job, getJobsByClientId } from '@/lib/types/job'
import Layout from '@/components/dashboard/layout'
import AcceptRejectProposalButtons from './AcceptRejectProposalButtons'


export default function Jobs(){

    const {_id} = useSelector((state:RootState)=>state.users.user)
    const {data,error} = useSWR('getjobs',getJobsByClientId(_id))

    const getDate = (date:Date | null)=> {
      return date && date.toString().slice(0,10)
    }

    if(error) return <p>An Error occurred</p>
    if(!Array.isArray(data)) return <p>loading.....</p>
    if(data.length < 1) return <p>No Job Available. Please Create A Job</p>

   

    return(
         <Box >
            <h2>All Jobs</h2>
        
            {data.map((job:Job,i:number)=>{
                    return(
                        <>
                         <Card key={i} sx={{marginTop:'1rem'}}
                        >
                           <CardContent>
                            <h3>{`Job Id: ${job._id}`}</h3>
                            <Box 
                            >
                                <h4 >Job Title:  </h4>
                                <p>{job.title}</p>
                            </Box>
                            <Box>
                                <h4>Job Type:  </h4>
                                <p>{job.type}</p>
                            </Box>
                            <Box>
                                <h4>Category:  </h4>
                                <p>{job.category}</p>
                            </Box>
                            <Box>
                                <h4>Description:  </h4>
                                <p>{job.description}</p>
                            </Box>
                            <Box>
                                <h4>Budget:  </h4>
                                <p>{job.budget}</p>
                            </Box>
                            <Box>
                                <h4>State:  </h4>
                                <p>{job.state}</p>
                            </Box>
                            <Box>
                                <h4>LGA:  </h4>
                                <p>{job.lga}</p>
                            </Box>
                           
                            <Box>
                                <h4>Street Address:  </h4>
                                <p>{job.address}</p>
                            </Box>
                            <Box>
                                <h4>Start Date:  </h4>
                                <p>{getDate(job.startDate)}</p>
                            </Box>
                            <Box>
                                <h4>End Date:  </h4>
                                <p>{getDate(job.endDate)} </p>
                            </Box>
                            <Box>
                                <h4>Agreed To Terms &  Conditions:  </h4>
                                <p>{job.agreeToTerms ? 'Yes' :'No'}</p>
                            </Box>
                            </CardContent>
                            <CardActions>
                                <AcceptRejectProposalButtons jobId={job._id}/>
                            </CardActions>
                            </Card>
                    </> 
                    )
                   })
            }
            
        </Box>
        
    )
}