import { CardHeader } from "@mui/material";
import { Box, Card, CardContent, Paper, Typography } from "@mui/material";
import Link from "next/link";


export default function WhySMNK(){

    return(
        <Paper style={{
            display:"flex",
            alignItems:"center",
            margin:"2rem 5rem"

        }}>
            <Card>
                <CardHeader title="Why SMNK?"></CardHeader>
                <CardContent> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                     standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make 
                     a type specimen book. 
                        <Link href='/whysmnk' style={{
                                    textDecoration:"underline", color:"blue"
                                }}>
                            Read more
                        </Link>
                     </CardContent>
            </Card>
            <Card>
                <CardHeader title="What Problems Do SMNK Solve?"></CardHeader>
                <CardContent> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                     standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make 
                     a type specimen book. <Link href='/whysmnk' style={{textDecoration:"underline", color:"blue"}}>Read more</Link></CardContent>
            </Card>
            <Card>
                <CardHeader title="How To Use SMNK"></CardHeader>
                <CardContent> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                     standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make 
                     a type specimen book. <Link href='/whysmnk' style={{textDecoration:"underline", color:"blue"}}>Read more</Link></CardContent>
            </Card>
        </Paper>
    )
}