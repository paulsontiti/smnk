import React from "react";
import { Container, Typography } from "@mui/joy";
import Layout from "@/components/layout";
import Head from "next/head";

function VisionPage() {
  return (
    <Layout>
      <Head>
        <title>SMNK Vision</title>
      </Head>
      <main>
        <Container sx={{ mt: "1rem" }}>
          <Typography mt={1} mb={1} fontWeight={"bold"}>
            {" "}
            VISION OF THE COMPANY:
          </Typography>
          To be a tenaciously dedicated company with integrity and vitality,
          passion and aliveness via continual-progressive innovation thus
          ensuring that customers’ satisfaction is not compromised but
          guaranteed.
          <Typography mt={1} mb={1} fontWeight={"bold"}>
            {" "}
            Value Statement:
          </Typography>{" "}
          We are dogged, highly responsible, efficiently effective, accountable,
          and steward-inclined; we learn progressively and continually, we have
          a winning mentality, we don’t give up, we foster trust in customers
          and assure quality, we are SMNK.
        </Container>
      </main>
    </Layout>
  );
}

export default VisionPage;
