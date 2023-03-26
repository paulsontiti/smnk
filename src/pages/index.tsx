import Layout from "@/components/layout";
import Head from "next/head";
import Script from "next/script";



export default function Home() {
  return (
    <Layout>

      <Head>
        <title>SMNK - Home</title>
      </Head>
      {/* <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={(window) =>{
          console.log(`script loaded correctly, window.FB has been populated`)
          console.log(typeof window !== 'undefined' && window.FB)
        }
        }
      /> */}
    </Layout>
  )
}
