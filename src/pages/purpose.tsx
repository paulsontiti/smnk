import React from "react";
import { Container, Typography } from "@mui/material";
import Layout from "@/components/layout";
import Head from "next/head";

function PurposePage() {
  return (
    <Layout>
      <Head>
        <title>SMNK Purpose Of The Business</title>
      </Head>
      <main>
        <Container sx={{ mt: "1rem" }}>
          <Typography mt={1} mb={1} fontWeight={"bold"}>
            {" "}
            PURPOSE OF THE BUSINESS:
          </Typography>
          <ol>
            <li>
              An online service platform which connects service
              providers/skilled workers with persons who require their services
              thereby curbing the rate of unemployment in Nigeria.
            </li>
            <li>
              To connect talented skilled workers with a wide range of
              opportunities.
            </li>
            <li>
              To create an online freelancing hub where individuals can work and
              earn money.
            </li>
            <li>
              To provide individuals who require skilled workers/service
              providers with excellent value for their money.
            </li>
            <li>
              To reduce the stress of negotiation between skilled workers and
              their employers.
            </li>
          </ol>
        </Container>
      </main>
    </Layout>
  );
}

export default PurposePage;
