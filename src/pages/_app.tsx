import Providers from '@/store/provider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
     <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline />
  <Providers>
  <Component {...pageProps} />
  </Providers>
    
    </>
  )
}
