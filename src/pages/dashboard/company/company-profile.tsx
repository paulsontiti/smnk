import {Box, Card, CardContent, CardHeader,CardActions} from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import {Typography} from '@mui/material'
import Link from 'next/link'
import { getCompanyProfile } from '@/lib/utils/user'
import useSWR from 'swr'

  

export default function CompanyProfile(){

    const {_id} = useSelector((state:RootState)=>state.users.user)
    const {data,error} =useSWR('getProfile',getCompanyProfile(_id))
    
    if(error) return <p>Error occurred</p>
    if(!data) return <p>loading.....</p>
    
    return(
            <Card sx={{backgroundColor:'gray'}}>
                <CardHeader title='Company Profile'></CardHeader>
                <CardContent>
                <Box sx={{
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                            marginTop:'1rem',
                        }}
                >
                    <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>Company Name:  </Typography>
                    <Typography>{data.name}</Typography>
                </Box>
                <Box sx={{
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                            marginTop:'1rem'
                        }}
                >
                    <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>Company Email:  </Typography>
                    <Typography>{data.email}</Typography>
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
                    <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>Office Address:  </Typography>
                    <Typography>{data.officeAddress}</Typography>
                </Box>
                <Box sx={{
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                            marginTop:'1rem'
                        }}
                >
                    <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>Description:  </Typography>
                    <Typography>{data.description}</Typography>
                </Box>
                </CardContent>
                <CardActions>
                <Link href='/dashboard/company/edit-company-profile' style={{
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
        
    )
}