
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import HomeMenuDrawer from './home/mobile/menuDrawer';
import { useMediaQuery } from '@material-ui/core';
import { Theme, useTheme } from '@mui/material/styles';
import MobileHeader from './home/mobile/mobileHeader';
import DesktopHeader from './home/desktop/desktopHeader';



export default function Header() {

  //mdedia query
  const theme : Theme  = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

 

  return (
    <div >
       
          {matches ? <MobileHeader/> :  <DesktopHeader/>}
           
          
      
        
      
    </div>
  );
}
