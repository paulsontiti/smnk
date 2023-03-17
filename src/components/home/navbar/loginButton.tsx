import Link from "next/link";

export default function LoginButton(){

    return(

        <Link href='/account/login' style={{
            textDecoration:'none',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            padding:'0.5rem .5rem',
            backgroundColor:'green',
            color:'white',
            borderRadius:'20px',
            margin:'1rem 1rem'
        }}>Login</Link>
    )
}