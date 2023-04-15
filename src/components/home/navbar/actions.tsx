import {Box, Button} from '@mui/material'
import { useSelector,useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoginButton from './loginButton'
import SignUpButton from './signUpButton'
import { useRouter } from 'next/router'
import Logout from '@/components/dashboard/logout';



export default function AccountActions(){

const router = useRouter()

    const {user} = useSelector((state:RootState)=>state.users)
    
    const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));



    return(
        <Box sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-end'
        }}>
            {user && user._id ?  <>
                                    <Logout/>
                                </>: 
                                <Box sx={{display:'flex',alignItems:'center',
                                            justifyContent:'center'
                                        }}>
                                    {!matches &&  <LoginButton/>}
                                    <SignUpButton/>
                                </Box>}
        </Box>
    )
}