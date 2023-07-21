import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, CardMedia } from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Typography, Card, CardContent } from "@mui/material";
import ReactPlayer from "react-player";
import { Document, Page, pdfjs } from "react-pdf";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function CatalogDisplayStepper({ catalog }: { catalog: any }) {
  console.log(catalog);
  //configure react-pdf
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = catalog && catalog.length;

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
      <Typography variant="caption">
        {catalog[activeStep].title ?? ""}
      </Typography>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={100000}
      >
        {catalog &&
          catalog.map((cat: any, index: number) => (
            <Box key={cat.filename}>
              {Math.abs(activeStep - index) <= 2 ? (
                <CatalogCard
                  filename={cat.filename}
                  title={cat.title}
                  description={cat.description}
                  contentType={cat.contentType ?? ""}
                />
              ) : null}
            </Box>
          ))}
      </AutoPlaySwipeableViews>

      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default CatalogDisplayStepper;
function CatalogCard({
  title,
  description,
  filename,
  contentType,
}: {
  title: string;
  filename: string;
  description: string;
  contentType: string;
}) {
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  function onDocumentLoadSuccess(numPages: any) {
    setNumPages(numPages);
  }
  return (
    <Card
      sx={{
        maxWidth: { xs: 300, sm: "100%" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        minHeight: 300,
        p: 2,
      }}
    >
      <CardContent>
        {contentType.startsWith("video") && (
          <ReactPlayer
            url={`/api/multer/catalog/${filename}`}
            controls={true}
            width={250}
            maxHeight={200}
            minHeight={200}
          />
        )}
        {contentType.startsWith("audio") && (
          <ReactPlayer
            url={`/api/multer/catalog/${filename}`}
            controls={true}
            width={250}
            maxHeight={200}
            minHeight={200}
            height={200}
          />
        )}
        {contentType.startsWith("image") && (
          <CardMedia
            sx={{
              maxHeight: 200,
              minHeight: 200,
              width: { xs: 250, sm: 600, md: 700 },
            }}
            image={`/api/multer/catalog/${filename}`}
            title={title}
          />
        )}
        {filename.endsWith(".pdf") && (
          <Box overflow={"scroll"} maxHeight={200} minHeight={200}>
            <Document
              file={`/api/multer/catalog/${filename}`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} width={250} />
            </Document>
          </Box>
        )}
        <Typography fontWeight={"bold"} variant="subtitle1">
          Description:
        </Typography>
        <Typography textTransform={"capitalize"} variant="caption">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
