import {Box, Button, Grid, Typography} from '@mui/material'
import Link from 'next/link'
import { useSelector,useDispatch } from 'react-redux'
import { RootState,AppDispatch } from '@/store'
import { logout } from '@/store/slices/userSlice'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoginButton from './loginButton'
import SignUpButton from './signUpButton'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function AccountActions(){

const router = useRouter()

    const {user} = useSelector((state:RootState)=>state.users)
    const dispatch = useDispatch()
    
    const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));



    return(
        <Box sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-end'
        }}>
            {user && user._id ?  <>
                                <Button size='small' onClick={()=>{dispatch(logout())}} style={{
                                
                                padding:'0.3rem 0.5rem',
                                backgroundColor:'green',
                                color:'white',
                                borderRadius:'20px',
                                margin:'.1rem .1rem'
                            }}>Logout</Button>
                                </>: <>
                               {!matches &&  <LoginButton/>}
                           <SignUpButton/>
                        </>}
        </Box>
    )
}