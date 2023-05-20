import {Box,Grid} from '@mui/material'
import DP from './dp'
import DashBoardAppBar from '../appBar/DashBoardAppBar'
import DashboardBreadcrumb from '@/swDashboard/components/breadcrumbs/dashboard'


export default function Layout(props:{children:any}){
   

    //console.log(info)
    return(
        <>
             <DashBoardAppBar/>
            <Grid container >
               
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12}>
                               
                            <Box sx={{
                                backgroundColor:'blue'
                            }}>
                                <h1>ADS</h1>
                            </Box>
                        </Grid>
                        <Grid item  xs={12}>
                            <Box>
                                <DashboardBreadcrumb/>
                            <DP/>
                            {props.children}
                            </Box>
                        </Grid>
                    </Grid>
                       
                </Grid>
            </Grid>
        </>
       
       
    )
}