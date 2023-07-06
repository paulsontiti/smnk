import React from "react";
import { Container, Typography } from "@mui/material";
import Layout from "@/components/layout";
import Head from "next/head";

function WeAreTheBest() {
  return (
    <Layout>
      <Head>
        <title>Why SMNK</title>
      </Head>
      <main>
        <Container sx={{ mt: "1rem" }}>
          <Typography mt={1} mb={1} fontWeight={"bold"}>
            {`Why We're the Best:`}
          </Typography>
          <Typography>
            When it comes to your project, we at SMNKLimited.com are dedicated
            to making sure everything goes as smoothly as possible. Our aim is
            to make purchasing a service online as simple as purchasing a
            product, so when you do so:
          </Typography>
          <ol>
            <li> It simply takes a few clicks to find a professional. </li>
            <li>
              {" "}
              It is simple to connect to employment that is close to you.
            </li>
            <li> Purchasing process is a hassle-free experience.</li>
            <li> It is simple and straightforward to communicate. </li>
            <li>
              {" "}
              Service delivery is timely and accurate according to what Many of
              our professionals and Artisans have assisted hundreds of clients
              with their projects while being thoroughly verified professionals
              for many years. Let their experience and knowledge assist you in
              getting the outcomes you desire.
            </li>
          </ol>
        </Container>
      </main>
    </Layout>
  );
}

export default WeAreTheBest;
