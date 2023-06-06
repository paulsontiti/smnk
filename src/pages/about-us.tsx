import React from "react";
import { Container, Typography } from "@mui/joy";
import Layout from "@/components/layout";
import Head from "next/head";



function AboutUsPage() {
  return (
  <Layout>
    <Head>
<title>About Us</title>
    </Head>
    <main>
    <Container sx={{mt:'1rem'}}>
      <Typography mt={1} mb={1} fontWeight={'bold'}>About SMNK:</Typography>
      SMNK is a service-based platform that connects professionals and skilled
      workers to their target audience. As an intermediary, we help to solve the
      challenges of getting your preferred and reliable skilled workers/service
      providers from the comfort of your home or when in urgent need of someone
      reliable to salvage a situation.
      <Typography> The objectives of the company are</Typography>
      <ol>
        <li>
          Help professionals/skilled individuals expand their customer base.
        </li>
        <li>
          Connect demand with supply, at the same time, provide clients with
          true value for their money, as well as reduce incompetence.
        </li>
        <li>
          Reduce the stress of endlessly searching for competent hands to
          perform jobs/services.
        </li>
        <li>Provide a platform for individuals to be self-reliant.</li>
        <li>
          Reduce unnecessary hassles regarding payment after delivery of the
          job, loss of money, dissatisfaction, and disappointment on the part of
          individuals requiring one service or the other to be provided for
          them.
        </li>
      </ol>
      Furthermore, the company is committed to adequately curbing the number of
      unemployed people in Nigeria and as well, growing the skilled worker
      space. A situation whereby skilled individuals do not necessarily have to
      go out in search of jobs, but can find jobs easily online, like
      freelancers or individuals with digital skills. The company aims to be a
      global working online platform for all skilled individuals looking to take
      advantage of a platform that provides easy access to employers/those in
      demand of their skill set.
    </Container>
    </main>
  </Layout>
  );
}

export default AboutUsPage;
