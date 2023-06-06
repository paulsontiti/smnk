import * as React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { logout } from "@/store/slices/userSlice";
import AccountActions from "../home/navbar/actions";
import NavbarDrawer from "../home/navbar/navBarDrawer";
import SearchDrawer from "../drawer/SearchDrawer";
import LogoutSwitch from "../switch/LogoutSwitch";
import DPAvatar from "../avatar/DPAvatar";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";

export default function HomeLogoutAppBar() {
  const { user } = useSelector((state: RootState) => state.users);
  const router = useRouter()
  //const dispatch = useDispatch<AppDispatch>();
  // const [auth, setAuth] = React.useState(user ? true : false);
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAuth(event.target.checked);
  //   dispatch(logout());
  // };

  // const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <>
      {user._id && <LogoutSwitch />}
      <AppBar position="static">
        <Toolbar>
          <Grid container>
            <Grid item xs={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
              <NavbarDrawer />
            </Grid>
            <Grid item xs={3} display={'flex'} alignItems={'center'} justifyContent={'center'}>
              <Typography variant="h6" component="div">
                SMNK
              </Typography>
            </Grid>
            <Grid item xs={3} display={'flex'} alignItems={'center'} justifyContent={'flex-end'} ml={2}>
              <SearchDrawer />
            </Grid>
            <Grid item xs={4} display={'flex'} alignItems={'center'} justifyContent={'center'}>
              {user._id ? (
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
      </AppBar>
    </>
  );
}
