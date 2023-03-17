import {Box, Grid} from '@mui/material'
import AccountActions from './actions'
import NavSearchBox from './search'
import NavbarDrawer from './navBarDrawer'

export default function Navbar(){

    
    return(
        
            <Grid container sx={{
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}  
            >
                 <Grid item xs={2}>
                       <NavbarDrawer/>
                </Grid>
                <Grid item xs={3}>
                        <h5>SMNK</h5>
                </Grid>
               
                <Grid item xs={4}>
                    <NavSearchBox/>
                </Grid>
                <Grid item xs={3}>
                    <AccountActions/>
                </Grid>
            </Grid>
    )
}