import * as React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function ServiceCategories() {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      mt={5}
    >
      <Typography
        fontSize={"2rem"}
        mb={5}
      >{`You need it,we've got it`}</Typography>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexWrap={"wrap"}
      >
        <Category src="/assets/graphics.png" title="Graphics & Design" />
        <Category
          src="/assets/digital-marketing.png"
          title="Digital Marketing"
        />
        <Category src="/assets/writing.jpg" title="Writing & Translation" />
        <Category
          src="/assets/videos-animation.png"
          title="Videos & Animations"
        />
        <Category src="/assets/music.png" title="Music & Audio" />
        <Category
          src="/assets/digital-marketing.png"
          title="Programming & Tech"
        />
        <Category src="/assets/business.png" title="Business" />
        <Category src="/assets/lifestyle.png" title="Lifestyle" />
        <Category src="/assets/data.png" title="Data" />
        <Category src="/assets/photography.png" title="Photography" />
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
