import * as React from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";

export default function HowSMNKWorks() {
  const router = useRouter();
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      mt={5}
    >
      <Typography fontSize={"2rem"}>{`Let's Get You Started`}</Typography>
      <Typography variant="subtitle2">Follow these simple steps</Typography>
      <Box
        p={2}
        mt={2}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Image
          src="/assets/create-account.png"
          width={100}
          height={100}
          alt=""
        />
        <Typography variant="h5" m={3}>
          Create An Account
        </Typography>
        <Typography>
          Start Your journey with SMNK by creating an account. You can create an
          account as a Skilled Worker/Professional/Service Provider Or as a
          Client/Employer/Customer
        </Typography>
      </Box>
      <Box
        p={2}
        mt={2}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Image src="/assets/hire2.png" width={100} height={100} alt="" />
        <Typography variant="h5" m={5}>
          Post Jobs
        </Typography>
        <Typography>
          It is free and easy to post a job. You can simply choose your
          identity,profile and budget and recommendations would come witing
          minutes.
        </Typography>
      </Box>
      <Box
        p={2}
        mt={2}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Image src="/assets/choose.png" width={100} height={100} alt="" />
        <Typography variant="h5" m={5}>
          Choose A Professional
        </Typography>
        <Typography>
          No discrimination on any job. We have got Professionals/Artisans for
          jobs of any budget or size, across 1000+ skills. As long as there is a
          job to be done, then there is an expert that can do it
        </Typography>
      </Box>
      <Box
        p={2}
        mt={2}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Image src="/assets/pay-safely.jpeg" width={200} height={200} alt="" />
        <Typography variant="h5" m={5}>
          Pay Safely
        </Typography>
        <Typography>
          SMNK guarantees that only professionals/Skilled workers who have
          completed their jobs satisfactorily will receive your money. Fell free
          to pay through our milestone payment system.
        </Typography>
      </Box>
      <Box
        p={2}
        mt={2}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Image src="/assets/help.png" width={100} height={100} alt="" />
        <Typography variant="h5" m={5}>
          We Are Here To help
        </Typography>
        <Typography>
          Our talented team of recruiters are always available to find you the
          best fit for your job and ensure you get true value for your money
        </Typography>
      </Box>
    </Box>
  );
}
