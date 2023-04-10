import {Box, Card, CardContent, CardHeader,CardActions} from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import {Typography} from '@mui/material'
import Link from 'next/link'
import { getUserExp } from '@/lib/utils/user'
import Experience from '@/lib/types/experience'
import useSWR from 'swr'

export default function ExperienceComponent(){

    const {_id} = useSelector((state:RootState)=>state.users.user)
    const {data,error} = useSWR('getExp',getUserExp(_id))
    
    if(error) return <p>An Error occurred</p>
    if(!Array.isArray(data)) return <p>loading.....</p>
    if(data.length < 1) return <p>No Experience Available. Please Provide Your Experience Details</p>

    return(
        <Box >
            <h4>All Experiences</h4>
            {data.map((exp:Experience,i:number)=>{
                    return(
                        <>
                        <Card key={i} sx={{marginTop:'1rem'}}>
                            <CardContent>
                                <Box>
                                    <h5>Role Title</h5>
                                    <p>{exp.title}</p>
                                </Box>
                                <Box>
                                    <h5>Company/Employer</h5>
                                    <p>{exp.company}</p>
                                </Box>
                                <Box>
                                    <h5>State</h5>
                                    <p>{exp.state}</p>
                                </Box>
                                <Box>
                                    <h5>LGA</h5>
                                    <p>{exp.lga}</p>
                                </Box>
                                <Box>
                                    <h5>Company Address</h5>
                                    <p>{exp.address}</p>
                                </Box>
                                <Box>
                                    <h5>Start Date</h5>
                                    <p>{exp.startDate.toString().slice(0,10)}</p>
                                </Box>
                            
                                {!exp.onRole ? <>
                                                    <Box>
                                                        <h5>End State</h5>
                                                        <p>{exp.endDate?.toString().slice(0,10)}</p>
                                                    </Box>
                                                </> 
                                            : <h5 style={{color:'green'}}>Currently on this role</h5>}
                            </CardContent>
                            <CardActions>
                            <Link href={`/sw-dashboard/experience/${exp._id}`} style={{
                                                textDecoration:'none',
                                                display:'block',
                                                padding:'0.5rem 1rem',
                                                backgroundColor:'green',
                                                color:'white',
                                                borderRadius:'20px',
                                                margin:'.3rem .5rem'
                                            }}>Edit Experience</Link>
                             <Link href='/sw-dashboard/experience/add-experience' style={{
                                                textDecoration:'none',
                                                display:'block',
                                                padding:'0.5rem 1rem',
                                                backgroundColor:'navy',
                                                color:'white',
                                                borderRadius:'20px',
                                                margin:'.3rem .5rem'
                                            }}>Add New Experience</Link>
                            </CardActions>
                        </Card>
                    </> 
                    )
                   })
            }
           
        </Box>
        
    )
}