import {Box,Grid} from '@mui/material'
import Logout from './logout'
import DP from '../../swDashboard/components/account/dp'
import { useSelector} from 'react-redux'
import { RootState} from '@/store'
import MenuDrawer from '../../swDashboard/components/account/menuDrawer'
import DashboardBreadcrumb from '../../swDashboard/components/breadcrumbs/dashboard'
import CDashboardMenu from '@/c-dashboard/components/account/cDashboardMenu'
import SWDashboardMenu from '../../swDashboard/components/account/swDashboardMenu'
import DashboardHeader from './DashboardHeader'


export default function Layout(props:{children:any}){
    const {user} = useSelector((state:RootState)=>state.users)
   

    //console.log(info)
    return(
        <>
             <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <MenuDrawer>
                    <>
                        <DashboardHeader/>
                       {user && user.type === 'client' ? <CDashboardMenu/>: <SWDashboardMenu/>}
                    </>
                </MenuDrawer>
                <DashboardBreadcrumb/>
             </Box>
            <Grid container >
               
                <Grid item xs={12} sx={{marginTop:'1rem'}}>
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