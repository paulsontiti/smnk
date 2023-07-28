import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Image from "next/image";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
type ImageType = { id: number; src: string };

const images: ImageType[] = [
  { id: 1, src: "/assets/blog1.png" },
  { id: 2, src: "/assets/blog2.png" },
];
function BlogStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <AutoPlaySwipeableViews
      axis={theme.direction === "rtl" ? "x-reverse" : "x"}
      index={activeStep}
      onChangeIndex={handleStepChange}
      enableMouseEvents
      interval={4000}
    >
      {images.map((img: ImageType, index: number) => (
        <div key={img.id}>
          {Math.abs(activeStep - index) <= 2 ? (
            <Box height={{ xs: "50vh", md: "70vh", lg: "80vh" }}>
              <Box position={"relative"} width={"100%"} height={"100%"}>
                <Image src={img.src} fill sizes="100vw" alt="" />
              </Box>
              <Box
                position={"relative"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                bottom={{ xs: 45, sm: 70, md: 50 }}
                zIndex={100}
                pl={{ xs: 3, sm: 5, md: 10 }}
              >
                <Button
                  variant="contained"
                  sx={{ width: 200, fontWeight: "bold" }}
                >
                  Register
                </Button>
              </Box>
            </Box>
          ) : null}
        </div>
      ))}
    </AutoPlaySwipeableViews>
  );
}

export default BlogStepper;
