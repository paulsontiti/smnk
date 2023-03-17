import {Box, Card, CardContent, CardHeader,CardActions} from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import {Typography,Button} from '@mui/material'
import Link from 'next/link'


  

export default function PersonalInfo(){

    const {info} = useSelector((state:RootState)=>state.users)
    return(
        <Box >
            {info ?     
                    <>
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
                                <Typography>{info.firstName}</Typography>
                            </Box>
                            <Box sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginTop:'1rem'
                                    }}
                            >
                                <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>Last Name:  </Typography>
                                <Typography>{info.lastName}</Typography>
                            </Box>
                            <Box sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginTop:'1rem'
                                    }}
                            >
                                <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>User Name:  </Typography>
                                <Typography>{info.userName}</Typography>
                            </Box>
                            <Box sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginTop:'1rem'
                                    }}
                            >
                                <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>State:  </Typography>
                                <Typography>{info.address && info.address.state}</Typography>
                            </Box>
                            <Box sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginTop:'1rem'
                                    }}
                            >
                                <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>L.G.A:  </Typography>
                                <Typography>{info.address && info.address.lga}</Typography>
                            </Box>
                            <Box sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginTop:'1rem'
                                    }}
                            >
                                <Typography sx={{marginRight:'1rem',fontWeight:'bold'}}>Street Address:  </Typography>
                                <Typography>{info.address && info.address.street}</Typography>
                            </Box>
                            </CardContent>
                            <CardActions>
                            <Link href='/sw-dashboard/edit-personal-individual-info' style={{
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
                    </> : <h1>No Personal Info Available. Please Provide Your Personal Info</h1>
            }
           
        </Box>
        
    )
}