import {Box, Grid, Typography} from '@mui/material'
import Link from 'next/link'
import { useSelector,useDispatch } from 'react-redux'
import { RootState,AppDispatch } from '@/store'
import { logout } from '@/store/slices/userSlice'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoginButton from './loginButton'
import SignUpButton from './signUpButton'

export default function AccountActions(){

    const {loginDetails} = useSelector((state:RootState)=>state.users)
    const dispatch = useDispatch()

    const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

    return(
        <Box sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-end'
        }}>
            {loginDetails && loginDetails.token ?  <>
                                <Link href='/' onClick={()=>{dispatch(logout())}} style={{
                                textDecoration:'none',
                                display:'block',
                                padding:'0.3rem 0.5rem',
                                backgroundColor:'green',
                                color:'white',
                                borderRadius:'20px',
                                margin:'.1rem .1rem'
                            }}>Logout</Link>
                                </>: <>
                               {!matches &&  <LoginButton/>}
                           <SignUpButton/>
                        </>}
        </Box>
    )
}