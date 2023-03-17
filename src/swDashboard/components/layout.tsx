import {Box,Grid} from '@mui/material'
import DashboardMenu from './account/menu'
import Logout from './account/logout'
import DP from './account/dp'
import { useSelector,useDispatch } from 'react-redux'
import { RootState,AppDispatch } from '@/store'
import {useEffect}  from 'react'
import { fetchUserInfo } from '@/store/slices/userSlice'
import MenuDrawer from './account/menuDrawer'
import DashboardBreadcrumb from './breadcrumbs/dashboard'


export default function Layout(props:{children:any}){
    const {_id} = useSelector((state:RootState)=>state.users.user)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        
        _id && dispatch(fetchUserInfo(_id))
    },[_id,dispatch])

    return(
        <>
             <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <MenuDrawer>
                    <>
                        <Logout/>
                        <DashboardMenu/>
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