import Head from 'next/head'

import { Inter } from '@next/font/google'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AdvertSlider from '@/components/home/adverts';
import Testimonials from '@/components/home/testimonials';
import WhySMNK from '@/components/home/whySmnk';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>SMNK - We connect, you collect</title>
        <meta name="description" content="SMNK saves you from paying for unsatisfied and uncompleted services" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/smnk.jpg" />

      </Head>
      <main>
        <AdvertSlider/>
        <WhySMNK/>
        <Testimonials/>
      </main>
    </>
  )
}
