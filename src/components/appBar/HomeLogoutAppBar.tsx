import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import AccountActions from "../home/navbar/actions";
import NavbarDrawer from "../home/navbar/navBarDrawer";
import SearchDrawer from "../drawer/SearchDrawer";
import LogoutSwitch from "../switch/LogoutSwitch";
import DPAvatar from "../avatar/DPAvatar";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import ThemeContainer from "../theme/ThemeContainer";

export default function HomeLogoutAppBar() {
  const { user } = useSelector((state: RootState) => state.users);
  const router = useRouter()

  return (
    <>
      {user && user._id && <LogoutSwitch />}
    <ThemeContainer>

        <Toolbar>
          <Grid container>
            <Grid item xs={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
              <NavbarDrawer />
            </Grid>
            <Grid item xs={3} display={'flex'} alignItems={'center'} justifyContent={'center'}>
              <Typography variant="h6" component="div" sx={{color:'yellow'}}>
                SMNK
              </Typography>
            </Grid>
            <Grid item xs={3} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
              <SearchDrawer footer={false}/>
            </Grid>
            <Grid item xs={4} display={'flex'} alignItems={'center'} justifyContent={'center'}>
              {user && user._id ? (
               <IconButton onClick={()=>{
                if(user.type === 'skilled worker'){
                  router.push('/sw-dashboard')
                }else{
                  router.push('/c-dashboard')
                }
               }}>
                 <DPAvatar dp={user.dpFileName} />
               </IconButton>
              ) : (
                <AccountActions />
              )}
            </Grid>
          </Grid>
        </Toolbar>
    </ThemeContainer>
    </>
  );
}
