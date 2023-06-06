import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Container,
  Divider,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import Layout from "@/components/layout";
import Head from "next/head";
import { ListItemDecorator, Chip } from "@mui/joy";

function TeamPage() {
  return (
    <Layout>
      <Head>
        <title>SMNK Team</title>
      </Head>
      <main>
        <Container sx={{ mt: "1rem" }}>
          <Typography mt={1} mb={1} fontWeight={"bold"}>
            {" "}
            Meet Our Team:
          </Typography>
          <CEO />
          <Divider />
          <Admin />
          <Divider />
          <PRO />
          <Divider/>
          <HR/>
        </Container>
      </main>
    </Layout>
  );
}

const CEO = () => {
  return (
    <Box mt={2}>
      <Badge color="secondary" badgeContent={"C.E.O"}>
        <Avatar
          src="/assets/smnk_ceo.jpg"
          sx={{ width: 100, height: 100 }}
          alt="ceo"
        />
      </Badge>
      <Box mt={1}>
        <Typography fontWeight={"bold"}>Bio:</Typography>
        IGWEONU, KENECHUKWU EMMANUEL is the Chief Executive Officer and Founder
        of SMNK. He graduated with a degree in ECONOMICS from Anambra State
        University and the University of Nigeria, Nsukka where he bagged an
        M.Sc. He has a special bias in Development Economics and Innovation
        which explains why he has become a fine human developer and motivator.
        <Typography fontWeight={"bold"} m={1}>
          Philosophy about Life:
        </Typography>
        <i>
          {" "}
          We have to dare to dream, however frightening or big that dream may
          prove to be.
        </i>
      </Box>
    </Box>
  );
};
const Admin = () => {
  return (
    <Box mt={4}>
      <Badge color="secondary" badgeContent={"A.D/Secretary"}>
        <Avatar
          src="/assets/smnk_ceo.jpg"
          sx={{ width: 100, height: 100 }}
          alt="ceo"
        />
      </Badge>
      <Box mt={1}>
        <Typography fontWeight={"bold"}>Bio:</Typography>
        Anumba, Ogochukwu Mildred is the Administrative Director(A.D)/Sectary of
        the Company. She read Computer Science/Science Education from the
        prestigious Nnamdi Azikiwe University, Awka with bias in Data Science.
        She is a fine graphic developer and content creator.
        <Typography fontWeight={"bold"} m={1}>
          Philosophy about Life:
        </Typography>
        <i>
          {" "}
          Replace your fears of failure with the resilience to face them.
          Failure is important in the journey to success because it teaches you
          lessons no one else would. It teaches you to appreciate your success.
        </i>
      </Box>
    </Box>
  );
};

const PRO = () => {
  return (
    <Box mt={4}>
      <Badge color="secondary" badgeContent={"D.A.P"}>
        <Avatar
          src="/assets/smnk_ceo.jpg"
          sx={{ width: 100, height: 100 }}
          alt="ceo"
        />
      </Badge>

      <Box mt={1}>
        <Typography fontWeight={"bold"}>Bio:</Typography>
        Alidu, Ojonugbede Samuel read Theatre and Film Studies at the University
        of Nigeria, Nsukka and Kogi State University-Anyigba respectively.{" "}
        <p>
          He is the company's Director of Advertorials and Publicity(D.A.P).
        </p>{" "}
        He specializes as an Applied Theatre Developer and Strategic
        Communications Expert dealing with human content development and a
        security strategist.
        <Typography fontWeight={"bold"} m={1}>
          Philosophy about Life:
        </Typography>
        <i>
          {" "}
          {`Even when all the buses don't go my way, I win; always. I have no
          excuses for failure, hence; I take responsibility for my life and
          actions.`}
        </i>
      </Box>
    </Box>
  );
};
const HR = () => {
  return (
    <Box mt={4}>
      <Badge color="secondary" badgeContent={"D.M.H.R"}>
        <Avatar
          src="/assets/smnk_ceo.jpg"
          sx={{ width: 100, height: 100 }}
          alt="ceo"
        />
      </Badge>

      <Box mt={1}>
        <Typography fontWeight={"bold"}>Bio:</Typography>
        Uzonna J. Ibekwe (Ph.D) is the company's Director of Management and
        Human Resource(D.M.H.R). He read Human Resource Management, Logistics &
        Supply Chain Management from the University of Abuja and University of
        Nigeria, Nsukka where he developed a special bias Human Resource
        Management and Development.
        <Typography fontWeight={"bold"} m={1}>
          Philosophy about Life:
        </Typography>
        <i>
          {" "}
          {`Nothing Great was ever achieved except by those who dare believed that something inside of them was beyond circumstances. If you can think it, you can achieve it`}
        </i>
      </Box>
    </Box>
  );
};
export default TeamPage;
