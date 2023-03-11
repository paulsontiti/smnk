import Grid from "@material-ui/core/Grid";
import SMNK from "../smnk";
import DesktopAccount from "./desktopAccount";
import Menu from "./menu";
import DesktopSearchBox from "./searchWrapper";
import styles from '../../../styles/home/desktopHeader.module.css'


export default function DesktopHeader(){


    return(
        <>
        <Grid container className={styles.container}>

            <Grid item lg={3}>
<Menu/>
            </Grid>
            <Grid item  lg={2}>
            <SMNK />
            </Grid>
            
            <Grid item lg={3} >
            <DesktopSearchBox/>
                
            </Grid>
            <Grid item lg={2}>
            <DesktopAccount/>
            </Grid>
        </Grid>
          {/* <Box sx={{
           margin:'0.3rem 1rem',
            display:'flex',
                 alignItems:'center',
                 justifyContent:'space-between'
        }}>
            <Box sx={{
                 display:'flex',
                 alignItems:'center',
                 justifyContent:'flex-start'
            }}>
            <Box sx={{marginRight:20,marginLeft:5}}>
                 
            </Box>
            <Box>
                
            </Box>
            
            </Box>
            
            <Box sx={{
                display:'flex',
                alignItems:'center',
                marginRight:'30px'
            }}>
                
            </Box>
        </Box> */}
        </>

      
    )
}