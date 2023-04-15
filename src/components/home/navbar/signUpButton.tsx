
import {Button} from '@mui/material'
import {useRouter } from 'next/router'

export default function SignUpButton(){
    const router = useRouter()

    return(
        <Button onClick={()=>{
                            router.push('/account/signup') 
                        }} 
                sx={{textTransform:'capitalize',margin:'1rem .5rem'}}
                variant='contained'
                size='small'
        >Sign Up</Button>
    )
}