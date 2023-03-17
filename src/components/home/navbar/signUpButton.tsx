import Link from "next/link";

export default function SignUpButton(){

    return(
        <Link href='/account/signup' style={{
            textDecoration:'none',
            display:'block',
            padding:'0.3rem .5rem',
            backgroundColor:'navy',
            color:'white',
            borderRadius:'20px',
        }}>Sign Up</Link>
    )
}