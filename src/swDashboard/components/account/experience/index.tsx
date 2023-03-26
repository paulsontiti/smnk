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
    if(!data) return <p>loading.....</p>
    if(data.length < 1) return <p>No Experience Available. Please Provide Your Experience Details</p>

    return(
        <Box >
            {data.map((exp:Experience,i:number)=>{
                    return(
                        <>
                        <Card key={i} sx={{marginTop:'1rem'}}
                        >
                            <CardHeader title={exp.title.toUpperCase()}></CardHeader>
                            <CardContent>
                            
                            <Box sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                    }}
                            >
                                <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>Company:  </Typography>
                                <Typography>{exp.company}</Typography>
                            </Box>
                            <Box sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginTop:'1rem'
                                    }}
                            >
                                <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>State:  </Typography>
                                <Typography>{exp.state}</Typography>
                            </Box>
                            <Box sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginTop:'1rem'
                                    }}
                            >
                                <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>LGA:  </Typography>
                                <Typography>{exp.lga}</Typography>
                            </Box>
                            <Box sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginTop:'1rem'
                                    }}
                            >
                                <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>City:  </Typography>
                                <Typography>{exp.city}</Typography>
                            </Box>
                            <Box sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginTop:'1rem'
                                    }}
                            >
                                <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>Street Address:  </Typography>
                                <Typography>{exp.address}</Typography>
                            </Box>
                            <Box sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginTop:'1rem'
                                    }}
                            >
                                <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>Start Month:  </Typography>
                                <Typography>{exp.startMonth}</Typography>
                            </Box>
                            <Box sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginTop:'1rem'
                                    }}
                            >
                                <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>Start Year:  </Typography>
                                <Typography>{exp.startYear}</Typography>
                            </Box>
                            {!exp.onRole ? <>
                                <Box sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginTop:'1rem'
                                    }}
                            >
                                <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>End Month:  </Typography>
                                <Typography>{exp.endMonth}</Typography>
                            </Box>
                            <Box sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginTop:'1rem'
                                    }}
                            >
                                <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>End Year:  </Typography>
                                <Typography>{exp.endYear}</Typography>
                            </Box>
                                            </> : <Typography>Currently on this role</Typography>}
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