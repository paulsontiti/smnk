import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
type ImageType = { id: number; src: string };

const images: ImageType[] = [
  { id: 1, src: "/assets/dp1.png" },
  { id: 2, src: "/assets/dp2.png" },
  { id: 3, src: "/assets/dp3.png" },
  { id: 4, src: "/assets/dp4.png" },
  { id: 5, src: "/assets/dp5.png" },
  { id: 6, src: "/assets/dp6.png" },
];
function HomePageStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box>
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
              <Box
                component={"img"}
                src={img.src}
                width={"100%"}
                height={{ xs: "50vh", md: "70vh", lg: "80vh" }}
                p={{ xs: 2, md: 3 }}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </Box>
  );
}

export default HomePageStepper;
