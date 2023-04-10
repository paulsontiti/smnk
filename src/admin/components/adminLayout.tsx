import {Box,Grid} from '@mui/material'
import DP from '../../swDashboard/components/account/dp'
import { useSelector} from 'react-redux'
import { RootState} from '@/store'
import MenuDrawer from '../../swDashboard/components/account/menuDrawer'
import DashboardBreadcrumb from '../../swDashboard/components/breadcrumbs/dashboard'
import ADashboardMenu from './ADashboard'
import DashboardHeader from '@/components/dashboard/DashboardHeader'


export default function AdminLayout(props:{children:any}){
    const {user} = useSelector((state:RootState)=>state.users)
   

    //console.log(info)
    return(
        <>
             <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <MenuDrawer>
                    <>
                        <DashboardHeader/>
                       <ADashboardMenu/>
                    </>
                </MenuDrawer>
                <DashboardBreadcrumb/>
             </Box>
            <Grid container >
               
                <Grid item xs={12} sx={{marginTop:'1rem'}}>
                    <Grid container>
                        
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