import {Box, Card, CardContent, CardHeader,CardActions, Grid} from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import {Typography,Button} from '@mui/material'
import Link from 'next/link'
import { getUserInfo } from '@/lib/utils/user'
import useSWR from 'swr'
import { useRouter } from 'next/router'

  

export default function IndividualPersonalInfo(){

    const router = useRouter()

    const {_id} = useSelector((state:RootState)=>state.users.user)
    const {data,error} = useSWR('getUser',getUserInfo(_id))

    if(error) return <p>Error occurred</p>
    if(!data) return <p>No Personal Info</p>
    return(
        <Box >
            
                        <Card>
                            <CardContent>
                            <h4>Personal Info</h4>
                            <Grid container spacing={1} >
                                <Grid item xs={6}>
                                    <span>First Name:  </span>
                                </Grid>
                                <Grid item xs={6}>
                                    <span>{data.firstName}</span>
                                </Grid>
                                <Grid item xs={6}>
                                    <span>Last Name:  </span>
                                </Grid>
                                <Grid item xs={6}>
                                    <span>{data.lastName}</span>
                                </Grid>
                                <Grid item xs={6}>
                                    <span>UserName:  </span>
                                </Grid>
                                <Grid item xs={6}>
                                    <span>{data.userName}</span>
                                </Grid>
                                <Grid item xs={6}>
                                    <span>State:  </span>
                                </Grid>
                                <Grid item xs={6}>
                                    <span>{data.state}</span>
                                </Grid>
                            <Grid item xs={6}>
                                    <span>L.G.A:  </span>
                                </Grid>
                                <Grid item xs={6}>
                                    <span>{data.lga}</span>
                                </Grid>
                                <Grid item xs={6}>
                                    <span>Address:  </span>
                                </Grid>
                                <Grid item xs={6}>
                                    <span>{data.address}</span>
                                </Grid>
                                <Grid item xs={6}>
                                    <span>Description:  </span>
                                </Grid>
                                <Grid item xs={6}>
                                    <p>{data.description}</p>
                                </Grid>
                                
                            </Grid>
                           
                            </CardContent>
                            <CardActions>
                                <Button fullWidth size='small'
                                        onClick={()=>{
                                            router.push('/dashboard/individual/edit-personal-individual-info') 
                                        }}variant='contained'
                                >Edit Info</Button>
                            </CardActions>
                        </Card>
           
        </Box>
        
    )
}