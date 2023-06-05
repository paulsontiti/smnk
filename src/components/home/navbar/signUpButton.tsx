import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {Button} from '@mui/material'
import {useRouter } from 'next/router'

export default function SignUpButton({matches}:{matches:boolean}){
    const router = useRouter()

    return(
        <Button onClick={()=>{
                            router.push('/account/signup') 
                        }} 
                sx={{textTransform:'capitalize',margin:'1rem 0'}}
                variant='contained'
                size='small'
                endIcon = {!matches && <AccountBoxIcon/>}
        >Sign Up</Button>
    )
}