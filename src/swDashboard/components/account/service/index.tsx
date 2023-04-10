import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import useSWR from 'swr'
import axios from 'axios';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { getUserServices } from '@/lib/utils/user';
import { useRouter } from 'next/router';

export default function Service(){
  
    const router = useRouter()
    const {_id} = useSelector((state:RootState)=>state.users.user)

    const {data,error} = useSWR('getUserServ',getUserServices(_id))

    if(error) {console.log(error); return <h6>Error occurred</h6>}
    if(!data) return <h6>loading......</h6>


    return(
        <Box >
            <h4>All Services</h4>
            {data as any[] ?    
                data.map((d:any,i:number)=>(
                    <Card key={i}>
                    
                        <CardContent>
                            <Box>
                               <h5>Title</h5>
                               <p>{d.title}</p>
                            </Box>
                            <Box>
                                <h5>Category:</h5>
                                <p>{d.category}</p>
                            </Box>
                            <Box>
                                    <h5 >Skills:  </h5>
                               
                                    <ul>
                                        {d.skills.map((skill:string,i:number)=>(
                                            <li key={i}><Typography>{skill}</Typography></li>
                                        ))}
                                        
                                    </ul>
                                    
                                </Box>
                            <Box>
                                    <h5>Description:  </h5>
                               
                                    <p>{d.description}</p>
                                    {/* <Box sx={{maxWidth:'100%',minWidth:'100%',overflowWrap:"break-word",inlineSize: 'min-content'}}>{d.description}</Box> */}
                                </Box>
                        </CardContent>
                        <CardActions>
                            <Button size='small' variant='contained' onClick={()=>{
                                router.push(`/sw-dashboard/service/edit-service/${d._id}`)
                            }}>Edit Service</Button>
                            {data.length < 2 && <Button size='small' variant='contained' onClick={()=>{
                                router.push(`/sw-dashboard/service/add-service`)
                            }}>Add Service</Button>}
                        </CardActions>
                    
                </Card>
                )) 
                    : <h1>No Service Info Available. Please Provide Your Service Info</h1>
            }
        </Box>
        
    )
}