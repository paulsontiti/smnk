import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { logout } from '@/store/slices/userSlice';
import AccountActions from '../home/navbar/actions';
import NavbarDrawer from '../home/navbar/navBarDrawer';
import SearchDrawer from '../drawer/SearchDrawer';
import Logout from '../dashboard/logout';

export default function HomeLogoutAppBar() {
    const {user} = useSelector((state:RootState)=>state.users)
    const dispatch = useDispatch<AppDispatch>()
  const [auth, setAuth] = React.useState(user ? true : false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
    dispatch(logout())
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (


      <>
     
      <AppBar position="static">
        <Toolbar>
     
        <NavbarDrawer/>
          <Typography variant="h6" component="div">
            SMNK
          </Typography>
          <SearchDrawer/>
         <AccountActions/>
        </Toolbar>
      </AppBar>
      </>
  );
}