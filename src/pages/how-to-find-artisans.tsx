import React from "react";
import { Container, Typography } from "@mui/material";
import Layout from "@/components/layout";
import Head from "next/head";

function FindArtisan() {
  return (
    <Layout>
      <Head>
        <title>How to find artisan</title>
      </Head>
      <main>
        <Container sx={{ mt: "1rem" }}>
          <Typography mt={1} mb={1} fontWeight={"bold"}>
            {`Find Your Professional/Artisan
:`}
          </Typography>
          <Typography>
            {` When looking for a professional or Artisan online, you should never
            employ someone before thoroughly researching their qualifications.
            What are their credentials? Have they already completed work of this
            nature? Let us assist you in completing those gaps so that you may
            be sure of your choice. You may explore professional profiles on
            SMNKLimited.com and read each individual's biography,
            qualifications, portfolio, and client evaluations of previous work.
            You can send a message to your Professional/Artisan directly,
            outlining every part of what you want. Before agreeing to a
            transaction, talk about your project, exchange ideas and facts, and
            get a clear knowledge of who they are and what they can achieve
            before you accept them or seal the deal with them.`}
          </Typography>
        </Container>
      </main>
    </Layout>
  );
}

export default FindArtisan;
