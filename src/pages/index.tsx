import Footer from "@/components/footer/Footer";
import MsgForClientORTalent from "@/components/home/MsgForClientORTalent";
import Layout from "@/components/layout";
import AdsStepper from "@/components/stepper/AdsStepper";
import TestimonialStepper from "@/components/stepper/TestimonialStepper";
import AboutSMNKTab from "@/components/tabs/AboutSMNKTab";
import Head from "next/head";


export default function Home() {
  return (
    <Layout>

      <Head>
        <title>SMNK - Home</title>
        <link rel="icon" href="smnk.jpg" type="image/x-icon" />

      </Head>
     <main>
        <AdsStepper/>
       <AboutSMNKTab/>
      <MsgForClientORTalent src="/assets/talent-search.jpg" msg="Happy Talent Searching"/>
      <MsgForClientORTalent src="/assets/job-search.jpg" msg="Happy Job Searching"/>
       <TestimonialStepper/>
       <Footer/>
     </main>
    </Layout>
  )
}
