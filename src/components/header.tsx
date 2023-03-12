


import { useMediaQuery } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import DesktopHeader from './home/desktop/desktopHeader';



export default function Header() {

  //mdedia query
  const theme : Theme  = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

 

  return (
    <div >
       
          {matches ? <h1></h1> :  <DesktopHeader/>}
           
          
      
        
      
    </div>
  );
}
