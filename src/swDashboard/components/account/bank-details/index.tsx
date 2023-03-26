import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import useSWR from 'swr'
import axios from 'axios';
import { Box, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { getUserBankDetails } from '@/lib/utils/user';




  

export default function BankDetails(){
    

      
    const {_id} = useSelector((state:RootState)=>state.users.user)

    const {data,error} = useSWR('getBankDetails', getUserBankDetails(_id))

    if(error) {console.log(error); return <h6>Error occurred</h6>}
    if(!data) return <h6>loading......</h6>


    return(
        <Box sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
        }}>
            <Card sx={{marginTop:5}} 
                    >
                        <CardHeader title='My Bank Details'></CardHeader>
           
                        <CardContent>
                            <Grid container marginBottom={2}>
                                <Grid item xs={12}>
                                    <Typography  sx={{marginRight:'1rem',fontWeight:'bold'}}>Account Name:  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    
                                    <Typography>{data.accountName}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container  marginBottom={2}>
                                <Grid item xs={12}>
                                    <Typography  sx={{marginRight:'1rem',fontWeight:'bold'}}>Account Number:  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    
                                    <Typography>{data.accountNumber}</Typography>
                                </Grid>
                            </Grid>
                   
                            <Grid container  marginBottom={2}>
                                <Grid item xs={12}>
                                    <Typography  sx={{marginRight:'1rem',fontWeight:'bold'}}>Bank Name:  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                <Typography>{data.bankName}</Typography>
                                   
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Link href={`/sw-dashboard/bank-details/${_id}`} style={{
                                                textDecoration:'none',
                                                display:'block',
                                                padding:'0.5rem 1rem',
                                                backgroundColor:'green',
                                                color:'white',
                                                borderRadius:'20px',
                                                margin:'.3rem .5rem'
                                            }}
                            >Edit Bank Details</Link>
                           
                        </CardActions>            
           </Card>
        </Box>
        
    )
}