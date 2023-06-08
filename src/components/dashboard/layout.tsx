import {Box,Grid} from '@mui/material'
import DP from './dp'
import DashBoardAppBar from '../appBar/DashBoardAppBar'
import DashboardBreadcrumb from '@/swDashboard/components/breadcrumbs/dashboard'
import AdsStepper from '../stepper/AdsStepper'
import Footer from '../footer/Footer'


export default function Layout(props:{children:any}){
   

    //console.log(info)
    return(
        <>
             <DashBoardAppBar/>
            <Grid container >
               
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item  xs={12}>
                            <Box>
                            <DP/>
                            {props.children}
                            </Box>
                        </Grid>
                        {/* <Grid item xs={12}>
                          
                               <AdsStepper/>
                        </Grid> */}
                    </Grid>
                       
                </Grid>
            </Grid>
            {/* <Footer/> */}
        </>
       
       
    )
}