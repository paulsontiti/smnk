
import {Grid, Typography ,Card,CardContent, CardHeader} from "@mui/material";

import { useRouter } from "next/router";
import {useSelector} from "react-redux";
import { RootState } from "@/store";

export default function SMNKBankDetails(){
    const router = useRouter() 
  
    const {user} = useSelector((state:RootState)=>state.users)
  


    return(
        <Card>
            
                <CardContent>
                <CardHeader subheader='SMNK Bank Details'/>
                    <Grid container>
                            <Grid item xs={6}>
                                <Typography variant="body2">Account Name: </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{marginBottom:3}}>
                                <Typography variant="caption" sx={{fontWeight:'bold'}}>Smnk Nigeria Limited</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">Account Number: </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{marginBottom:3}}>
                                <Typography variant="caption" sx={{fontWeight:'bold'}}>09236457218</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">Bank Name: </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="caption" sx={{fontWeight:'bold'}}>Access Bank</Typography>
                            </Grid>
                    </Grid>
                </CardContent>

            
        </Card>
       
    )
}