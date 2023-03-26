import {Box, Card, CardContent, CardHeader,CardActions} from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import {Typography,Button} from '@mui/material'
import Link from 'next/link'
import { getUserInfo } from '@/lib/utils/user'
import useSWR from 'swr'

  

export default function IndividualPersonalInfo(){
    const {_id} = useSelector((state:RootState)=>state.users.user)
    const {data,error} = useSWR('getUser',getUserInfo(_id))
    
    if(error) return <p>Error occurred</p>
    if(!data) return <p>loading.....</p>
    return(
        <Box >
            
                        <Card sx={{backgroundColor:'gray'}}
                        >
                            <CardHeader title='Personal Info'></CardHeader>
                            <CardContent>
                            <Box sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginTop:'1rem',
                                    }}
                            >
                                <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>First Name:  </Typography>
                                <Typography>{data.firstName}</Typography>
                            </Box>
                            <Box sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginTop:'1rem'
                                    }}
                            >
                                <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>Last Name:  </Typography>
                                <Typography>{data.lastName}</Typography>
                            </Box>
                            <Box sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginTop:'1rem'
                                    }}
                            >
                                <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>User Name:  </Typography>
                                <Typography>{data.userName}</Typography>
                            </Box>
                            <Box sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginTop:'1rem'
                                    }}
                            >
                                <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>State:  </Typography>
                                <Typography>{data.state}</Typography>
                            </Box>
                            <Box sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginTop:'1rem'
                                    }}
                            >
                                <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>L.G.A:  </Typography>
                                <Typography>{data.lga}</Typography>
                            </Box>
                            <Box sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginTop:'1rem'
                                    }}
                            >
                                <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>Street Address:  </Typography>
                                <Typography>{data.address}</Typography>
                            </Box>
                            </CardContent>
                            <CardActions>
                            <Link href='/dashboard/individual/edit-personal-individual-info' style={{
                                                textDecoration:'none',
                                                display:'block',
                                                padding:'0.5rem 1rem',
                                                backgroundColor:'green',
                                                color:'white',
                                                borderRadius:'20px',
                                                margin:'.3rem .5rem'
                                            }}>Edit Info</Link>
                            </CardActions>
                        </Card>
           
        </Box>
        
    )
}