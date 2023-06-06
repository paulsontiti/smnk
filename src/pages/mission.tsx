import React from "react";
import { Container, Typography } from "@mui/joy";
import Layout from "@/components/layout";
import Head from "next/head";

function MissionPage() {
  return (
    <Layout>
      <Head>
        <title>SMNK Mission</title>
      </Head>
      <main>
        <Container sx={{ mt: "1rem" }}>
          <Typography mt={1} mb={1} fontWeight={"bold"}>
            {" "}
            MISSION OF THE COMPANY:
          </Typography>
          To be the earth’s most friendly customer base; where top-notch online
          professionals carry out hands on businesses with the sole aim of
          connecting clients to their preferred/needed services and products and
          where jobs are delivered efficiently and effectively.
        </Container>
      </main>
    </Layout>
  );
}

export default MissionPage;
