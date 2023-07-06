import AdvertCard from "@/components/card/AdsCard";
import HowSMNKWorks from "@/components/card/HowSMNKWorks";
import Layout from "@/components/layout";
import AdsStepper from "@/components/stepper/AdsStepper";
import TestimonialStepper from "@/components/stepper/TestimonialStepper";
import Head from "next/head";
import ReactPlayer from "react-player";
import Image from "next/image";
import ServiceCategoryStepper from "@/components/stepper/ServiceCategoryStepper";
import ServiceCategories from "@/components/card/ServiceCategories";
import { Typography, Box } from "@mui/material";
import * as React from "react";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>SMNK - Home</title>
        <link rel="icon" href="smnk.jpg" type="image/x-icon" />
      </Head>
      <main>
        <Box>
          <video width="100%" height="300" controls autoPlay loop>
            <source src="/assets/SMNK front page video.mp4" type="video/mp4" />
            <source src="/assets/SMNK front page video.ogg" type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </Box>
        {/* <Box mt={{ md: 5 }} width={1200}>
          <ReactPlayer
            url="/assets/SMNK front page video.mp4"
            playing
            loop
            controls
            width={"100%"}
          />
        </Box> */}

        <ServiceCategories />
        <HowSMNKWorks />

        <TestimonialStepper />
      </main>
    </Layout>
  );
}
