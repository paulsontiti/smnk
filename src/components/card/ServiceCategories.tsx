import * as React from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  CardContent,
  CardActions,
  CardHeader,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import SearchDrawer from "../drawer/SearchDrawer";

export default function ServiceCategories() {
  const router = useRouter();
  return (
    <Card sx={{ m: 2 }}>
      <CardHeader title=" Search in our different categories" />
      <CardContent>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
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
            <Category src="/assets/hair.jpg" title="Hair & Nails" />
            <Category src="/assets/art.png" title="Art" />
            <Category src="/assets/building.png" title="Building" />

            <Category src="/assets/interior.png" title="Interior Deco" />
          </Box>
          <Box mt={1}>
            <SearchDrawer searchOption="Services" />
          </Box>
        </Box>
      </CardContent>
      <CardActions
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Button
          sx={{
            bgcolor: "#7E1120",
            borderRadius: "30px",
            mr: 2,
            color: "white",
            minWidth: 150,
          }}
          onClick={() => {
            router.push("/account/signup");
          }}
          size="small"
        >
          Hire an Artisan
        </Button>
        <Button
          size="small"
          sx={{
            bgcolor: "#E08300",
            borderRadius: "30px",
            color: "white",
            minWidth: 150,
          }}
          onClick={() => {
            router.push("/account/signup");
          }}
        >
          Earn as an Artisan
        </Button>
      </CardActions>
    </Card>
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
