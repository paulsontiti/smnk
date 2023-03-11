

import AccountLayout from "@/account/components/layout";
import SignUp from "@/account/components/signup";
import Head from "next/head";

export default function SignUpPage(){

    return(
        <AccountLayout>
<Head>
    <title>Create Account</title>
</Head>
<SignUp/>
        </AccountLayout>
            
           
    )
}