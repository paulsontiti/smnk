import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import useSWR from 'swr'
import { Card, CardActions, CardContent, Button, Grid, Typography } from '@mui/material';
import { getUserBankDetails } from '@/lib/utils/user';
import {useRouter} from 'next/router'

export default function BankDetails(){
    
const router = useRouter()
      
    const {user:{bankDetails}} = useSelector((state:RootState)=>state.users)
    if(!bankDetails) return <Typography>No Bank Details. Please add your bank details</Typography>

    return(
        <>
            <Typography sx={{margin:'2rem 1rem', fontWeight:'bold'}}>Bank Details</Typography>
            <Card>
           
                        <CardContent>
                            <Grid container marginBottom={2}>
                                <Grid item xs={12}>
                                    <Typography  sx={{marginRight:'1rem',fontWeight:'bold'}}>Account Name:  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    
                                    <Typography>{bankDetails.accountName}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container  marginBottom={2}>
                                <Grid item xs={12}>
                                    <Typography  sx={{marginRight:'1rem',fontWeight:'bold'}}>Account Number:  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    
                                    <Typography>{bankDetails.accountNumber}</Typography>
                                </Grid>
                            </Grid>
                   
                            <Grid container  marginBottom={2}>
                                <Grid item xs={12}>
                                    <Typography  sx={{marginRight:'1rem',fontWeight:'bold'}}>Bank Name:  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                <Typography>{bankDetails.bankName}</Typography>
                                   
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button size='small' variant='contained' fullWidth onClick={()=>{
                                router.push(`/sw-dashboard/bank-details/edit-bank-details`)
                            }}>Edit Bank Details</Button>
                           
                        </CardActions>            
           </Card>
        </>
        
    )
}