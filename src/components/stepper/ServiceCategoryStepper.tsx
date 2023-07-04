import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useRouter } from "next/router";
import Image from "next/image";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const images = [
  { id: 1, src: "/assets/barber.png", title: "Barber" },
  { id: 2, src: "/assets/mechanic.png", title: "Mechanic" },
  {
    id: 3,
    src: "/assets/decorator.png",
    title: "Interior Decorator",
  },
  { id: 4, src: "/assets/baker.jpeg", title: "Baker" },
  { id: 5, src: "/assets/accountant.jpg", title: "Accountant" },
];

function ServiceCategoryStepper() {
  const router = useRouter();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
        interval={2000}
      >
        {images.map((img: any, index: number) => (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            key={img.id}
          >
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
              >
                {" "}
                <Image src={img.src} width={100} height={100} alt="" />
                <Typography variant="h5" color="primary">
                  {img.title}
                </Typography>
              </Box>
            ) : null}
          </Box>
        ))}
      </AutoPlaySwipeableViews>
    </Box>
  );
}

export default ServiceCategoryStepper;
