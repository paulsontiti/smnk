import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
// import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
// import SaveIcon from '@mui/icons-material/Save';
// import PrintIcon from '@mui/icons-material/Print';
// import ShareIcon from '@mui/icons-material/Share';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useRouter } from 'next/router';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { logout } from '@/store/slices/userSlice';


export default function DashBoardSpeedDial() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()


  const actions = [
  //   { icon: <FileCopyIcon />, name: 'Copy' },
  //   { icon: <SaveIcon />, name: 'Save' },
  //   { icon: <PrintIcon />, name: 'Print' },
    { icon: <LogoutIcon />, name: 'Logout',  onClick : ()=>{
      if((confirm('Are you sure you want to log out?'))){
          dispatch(logout())
          router.push('/')
      }
  }},
    { icon: <RefreshIcon />, name: 'Refresh Page',onClick:()=>{handleClose()
      router.reload()} },
  ];
  return (
      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        sx={{ position: 'fixed', top: 300, right: 20 }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
            tooltipOpen
          />
        ))}
      </SpeedDial>
  );
}