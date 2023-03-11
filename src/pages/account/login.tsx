import AccountLayout from "@/account/components/layout";
import Login from "@/account/components/login";
import Head from "next/head";

export default function LoginPage(){

    

    return(
       
<AccountLayout>
    <Head>
        <title>Login</title>
    </Head>
<Login/>  
</AccountLayout>
 
    )
}
