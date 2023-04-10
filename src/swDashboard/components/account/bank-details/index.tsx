import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import useSWR from 'swr'
import { Card, CardActions, CardContent, Button, Grid, Typography } from '@mui/material';
import { getUserBankDetails } from '@/lib/utils/user';
import {useRouter} from 'next/router'

export default function BankDetails(){
    
const router = useRouter()
      
    const {_id} = useSelector((state:RootState)=>state.users.user)

    const {data,error} = useSWR('getBankDetails', getUserBankDetails(_id))

    if(error) {console.log(error); return <h6>Error occurred</h6>}
    if(!data) return <h6>loading......</h6>


    return(
        <>
            <h4>Bank Details</h4>
            <Card>
           
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
                            <Button size='small' variant='contained' fullWidth onClick={()=>{
                                router.push(`/sw-dashboard/bank-details/${_id}`)
                            }}>Edit Bank Details</Button>
                           
                        </CardActions>            
           </Card>
        </>
        
    )
}