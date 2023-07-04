import AdvertCard from "@/components/card/AdsCard";
import HowSMNKWorks from "@/components/card/HowSMNKWorks";
import Layout from "@/components/layout";
import AdsStepper from "@/components/stepper/AdsStepper";
import TestimonialStepper from "@/components/stepper/TestimonialStepper";
import { Box, Typography } from "@mui/material";
import Head from "next/head";
import ReactPlayer from "react-player";
import Image from "next/image";
import { theme } from "./_app";
import ServiceCategoryStepper from "@/components/stepper/ServiceCategoryStepper";
import ServiceCategories from "@/components/card/ServiceCategories";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>SMNK - Home</title>
        <link rel="icon" href="smnk.jpg" type="image/x-icon" />
      </Head>
      <main>
        <Box mt={{ md: 5 }}>
          <ReactPlayer
            url="/assets/SMNK front page video.mp4"
            playing
            loop
            width={"100%"}
          />
        </Box>

        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          mb={5}
        >
          <Image src="/assets/join-us.jpg" width={350} height={200} alt="" />
        </Box>
        <Box
          mt={2}
          mb={2}
          color="white"
          borderRadius={"10%"}
          maxWidth={"100%"}
          height={500}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          <Image
            src="/assets/hire-seo-expert-info1.png"
            width={300}
            height={200}
            alt=""
          />
          <Typography m={3} color={"primary"}>
            Search For Our Services
          </Typography>
          <ServiceCategoryStepper />
        </Box>
        <ServiceCategories />
        <HowSMNKWorks />

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
