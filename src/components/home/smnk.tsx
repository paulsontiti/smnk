import { Typography } from "@mui/material";
import Image from "next/image";
//import logo from '/smnk.jpg'

export default function SMNK(){

    const style={
        color:'white',
        font:"bold",
        fontSize:"1.3rem"

    }

    return <Image alt="SMNK" src="/smnk.jpg" width={100} height={50}/>
}