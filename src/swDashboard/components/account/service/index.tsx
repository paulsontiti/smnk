import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import useSWR from 'swr'
import axios from 'axios';
import { Box, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { getUserServices } from '@/lib/utils/user';




export default function Service(){

  


  
    const {_id} = useSelector((state:RootState)=>state.users.user)

    const {data,error} = useSWR('getUserServ',getUserServices(_id))

    if(error) {console.log(error); return <h6>Error occurred</h6>}
    if(!data) return <h6>loading......</h6>


    return(
        <Box >
            <Card sx={{marginTop:5}} 
                    >
                        <CardHeader title='My Services'></CardHeader>
            {data as any[] ?    
                data.map((d:any,i:number)=>(
                    <>
                    
                        <CardContent key={i}>
                            <Grid container marginBottom={2}>
                                <Grid item xs={12}>
                                    <Typography  sx={{marginRight:'1rem',fontWeight:'bold'}}>Title:  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    
                                    <Typography>{d.title}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container  marginBottom={2}>
                                <Grid item xs={12}>
                                    <Typography  sx={{marginRight:'1rem',fontWeight:'bold'}}>Category:  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    
                                    <Typography>{d.category}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container  marginBottom={2}>
                                <Grid item xs={12}>
                                    <Typography  sx={{marginRight:'1rem',fontWeight:'bold'}}>Skills:  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <ul>
                                        {d.skills.map((skill:string,i:number)=>(
                                            <li key={i}><Typography>{skill}</Typography></li>
                                        ))}
                                        
                                    </ul>
                                    
                                </Grid>
                            </Grid>
                            <Grid container  marginBottom={2}>
                                <Grid item xs={12}>
                                    <Typography  sx={{marginRight:'1rem',fontWeight:'bold'}}>Description:  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    
                                    <Box sx={{maxWidth:'100%',minWidth:'100%',overflowWrap:"break-word",inlineSize: 'min-content'}}>{d.description}</Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Link href={`/sw-dashboard/service/edit-service/${d._id}`} style={{
                                                textDecoration:'none',
                                                display:'block',
                                                padding:'0.5rem 1rem',
                                                backgroundColor:'green',
                                                color:'white',
                                                borderRadius:'20px',
                                                margin:'.3rem .5rem'
                                            }}
                            >Edit Service</Link>
                            {data.length < 2 && <Link href='/sw-dashboard/service/add-service' style={{
                                                textDecoration:'none',
                                                display:'block',
                                                padding:'0.5rem 1rem',
                                                backgroundColor:'green',
                                                color:'white',
                                                borderRadius:'20px',
                                                margin:'.3rem .5rem'
                                            }}
                            >Add Another Service</Link>}
                        </CardActions>
                    
                </>
                )) 
                    : <h1>No Service Info Available. Please Provide Your Service Info</h1>
            }
           </Card>
        </Box>
        
    )
}