import HowSMNKWorks from "@/components/card/HowSMNKWorks";
import Layout from "@/components/layout";
import TestimonialStepper from "@/components/stepper/TestimonialStepper";
import Head from "next/head";
import ServiceCategories from "@/components/card/ServiceCategories";
import { Typography, Box, Card, CardContent } from "@mui/material";
import ReactPlayer from "react-player";
import { findDOMNode } from "react-dom";
//import { toast } from 'react-toastify';
import { useState } from "react";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>SMNK - Home</title>
        <link rel="icon" href="smnk.jpg" type="image/x-icon" />
      </Head>
      <main>
        {/* <Box m={2} height={{ xs: 300, sm: 400, md: 500 }}>
          <video
            width="100%"
            height="100%"
            autoPlay
            loop
            controls
            style={{ objectFit: "fill" }}
          >
            <source src="/assets/SMNK front page video.mp4" type="video/mp4" />
            <source src="/assets/SMNK front page video.ogg" type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </Box> */}
        {/* <Box mt={{ md: 5 }} sx={{ objectFit: "fill" }}>
          <ReactPlayer
            url="/assets/SMNK front page video.mp4"
            playing
            loop
            controls
            style={{ objectFit: "fill" }}
          />
        </Box> */}

        <ServiceCategories />
        <HowSMNKWorks />
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          overflow={"scroll"}
        >
          <Card
            sx={{
              bgcolor: "#2266BF",
              color: "white",
              minHeight: 250,
              minWidth: 300,
            }}
          >
            <CardContent>
              <Typography variant="h6">How service fees are charged</Typography>
              <Typography>
                Each job comes with a fee, however the amount depends on how
                much money you would make from a customer. A 12% administrative
                cost fee would be applied to all skilled personnel.
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              bgcolor: "green",
              color: "white",
              minHeight: 250,
              minWidth: 300,
            }}
          >
            <CardContent>
              <Typography variant="h6">
                How your ranking impacts your success of landing jobs
              </Typography>
              <Typography>
                After completing them, your review gauges how happy your clients
                are with your job. Your work rating affects how well-liked and
                trusted you are among clients.
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              bgcolor: "#7E1120",
              color: "white",
              minHeight: 250,
              minWidth: 300,
            }}
          >
            <CardContent>
              <Typography variant="h6">Improvement suggestions</Typography>
              <Typography>
                Before submitting your work, make sure you often review it to
                ensure it is error-free. Before you start, take some time to go
                through what your clients want you to deliver.
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <TestimonialStepper />
      </main>
    </Layout>
  );
}

const PlayerComponent = () => {
  const [fullscreenMode, setFullscreenMode] = useState(false);
  let player: any;
  const ref = (p: any) => {
    player = p;
  };

  const onStart = () => {
    setFullscreenMode(true);
  };

  const onEnded = () => {
    setFullscreenMode(document.fullscreenElement !== null);
  };

  return (
    <ReactPlayer
      ref={ref}
      url="/assets/SMNK front page video.mp4"
      onStart={onStart}
      onEnded={onEnded}
      playing
      loop
    />
  );
};
