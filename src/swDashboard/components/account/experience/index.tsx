import {Box, Card, CardContent, CardHeader,CardActions, Grid, Typography} from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Link from 'next/link'
import EditFloatingActionButtons from '@/components/fab/Edit'
import { useRouter } from 'next/router'
import AddFloatingActionButtons from '@/components/fab/Add'
import moment from 'moment'

export default function ExperienceComponent(){

    const {user} = useSelector((state:RootState)=>state.users)
    const router = useRouter()
    return(
        <Box >
            {user && user.experience && user.experience.map((exp,i)=>{
                    return(
                        <>
                        <Card key={i} sx={{marginTop:'1rem'}}>
                            <CardContent>
                                <Grid container rowSpacing={1}>
                                    <Grid item xs={6}>
                                    <Typography>Role Title</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Typography variant='caption'>{exp.title}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Typography>Employer</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Typography variant='caption'>{exp.company}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Typography>State</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Typography variant='caption'>{exp.state}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Typography>LGA</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Typography variant='caption'>{exp.lga}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Typography>Address</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Typography variant='caption'>{exp.address}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Typography>Start Date</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Typography variant='caption'>{moment(exp.startDate).format('DD/MM/YY')}</Typography>
                                    </Grid>
                                    {!exp.onRole ? <>
                                        <Grid item xs={6}>
                                    <Typography>End Date</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Typography variant='caption'>{moment(exp.endDate).format('DD/MM/YY')}</Typography>
                                    </Grid>
                                                </> 
                                            : <Typography color={'green'}>Currently on this role</Typography>}
                                </Grid>
                             
                        
                            </CardContent>
                            <CardActions>
                                <EditFloatingActionButtons handleClick={()=>{
                                    router.push( `/sw-dashboard/experience/${user.experience.findIndex(e=>e.startDate === exp.startDate )}`)
                                }}/>
                          <AddFloatingActionButtons handleClick={()=>{
                            router.push('/sw-dashboard/experience/add-experience')
                          }}/>
                             
                            </CardActions>
                        </Card>
                    </> 
                    )
                   })
            }
           
        </Box>
        
    )
}