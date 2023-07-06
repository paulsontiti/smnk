import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ServiceCategories() {
  const router = useRouter();
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      mt={2}
    >
      <Typography fontSize={"1.5rem"} mb={5} variant="h6">
        Search in our different categories
      </Typography>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexWrap={"wrap"}
      >
        <Category src="/assets/graphics.png" title="Hair & Nails" />
        <Category src="/assets/digital-marketing.png" title="Art" />
        <Category src="/assets/writing.jpg" title="Building" />

        <Category src="/assets/digital-marketing.png" title="Tech" />
        <Category src="/assets/business.png" title="Interior Deco" />
        <Category src="/assets/photography.png" title="Photography" />
      </Box>
      <Box mt={2}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#7E1120",
            color: "white",
            mr: 2,
            borderRadius: "30px",
          }}
          onClick={() => {
            router.push("/account/signup");
          }}
        >
          Hire an Artisan
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: "30px", bgcolor: "#E08300" }}
          onClick={() => {
            router.push("/account/signup");
          }}
        >
          Earn as an Artisan
        </Button>
      </Box>
    </Box>
  );
}

function Category({ src, title }: { src: string; title: string }) {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      minWidth={150}
      maxWidth={150}
    >
      <Image src={src} width={50} height={50} alt="" />
      <Typography variant="caption" m={1}>
        {title}
      </Typography>
    </Box>
  );
}
