import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { logout } from '@/store/slices/userSlice'
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import LogoutIcon from '@mui/icons-material/Logout';
    
export default function Logout(){
    const dispatch = useDispatch<AppDispatch>()

    const router = useRouter()

    const logoutHandler =()=>{
        if((confirm('Are you sure you want to log out?'))){
            dispatch(logout())
            router.push('/')
        }
    }

    return(           
           
        <>
        <Button   sx={{textTransform:'capitalize'}}
                variant='contained'
                size='small'
                endIcon={<LogoutIcon/>}
                 onClick={()=>{
                if((confirm('Are you sure you want to log out?'))){
                    dispatch(logout())
                    router.push('/')
                }
            }}>Logout</Button>
                  {/* {
    <FormGroup sx={{ml:0}}>
    <FormControlLabel
      control={
        <Switch
          checked
          onChange={logoutHandler}
          aria-label="login switch"
          color='primary'
          
        />
      }
      label='Logout'
    />
  </FormGroup>
} */}
        </>
    )
}
