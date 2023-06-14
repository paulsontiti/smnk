import AdvertCard from "@/components/card/AdsCard";
import Layout from "@/components/layout";
import AdsStepper from "@/components/stepper/AdsStepper";
import TestimonialStepper from "@/components/stepper/TestimonialStepper"
import Head from "next/head";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>SMNK - Home</title>
        <link rel="icon" href="smnk.jpg" type="image/x-icon" />
      </Head>
      <main>
        <AdvertCard
        landingPage="/services"
        actionText="Find Pros"
          title="Find pros with the necessary expertise"
          src="/assets/talent-search.jpg"
          message="You can connect with professionals and teams that can complete your project with a short search here."
        />
         <AdvertCard
         landingPage="/jobs"
         actionText="Find Jobs"
           src="/assets/job-search.jpg"
           message="Register as a Professional or a team and have clients within your location discover you for jobs."
           title="Searching for job or Labour?
           "
        />
       
      
           <AdsStepper />
        <TestimonialStepper />
      </main>
    </Layout>
  );
}
