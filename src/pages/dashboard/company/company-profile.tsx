import {Box, Card, CardContent, Button,CardActions} from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { getCompanyProfile } from '@/lib/utils/user'
import useSWR from 'swr'
import {useRouter} from 'next/router'
  

export default function CompanyProfile(){


    const router = useRouter()
    const {_id} = useSelector((state:RootState)=>state.users.user)
    const {data,error} =useSWR('getProfile',getCompanyProfile(_id))
    
    if(error) return <p>Error occurred</p>
    if(!data) return <p>loading.....</p>
    
    return(
            <Card>
                <CardContent>
                <h4>{`Company's Profile`}</h4>
                <Box 
                >
                    <h5>Company Name:  </h5>
                    <p>{data.name}</p>
                </Box>
                <Box>
                    <h5>Company Email:  </h5>
                    <p>{data.email}</p>
                </Box>
                <Box>
                    <h5>Company Phone Number:  </h5>
                    <p>{data.phone}</p>
                </Box>
                
                <Box>
                    <h5>State:  </h5>
                    <p>{data.state}</p>
                </Box>
                <Box>
                    <h5>L.G.A:  </h5>
                    <p>{data.lga}</p>
                </Box>
                <Box>
                    <h5>Office Address:  </h5>
                    <p>{data.officeAddress}</p>
                </Box>
                <Box>
                    <h5>Description:  </h5>
                    <p>{data.description}</p>
                </Box>
                </CardContent>
                <CardActions>
                <Button size='small' variant='contained' fullWidth onClick={()=>{
                    router.push('/dashboard/company/edit-company-profile')
                }}>Edit Info</Button>
                </CardActions>
            </Card>
        
    )
}