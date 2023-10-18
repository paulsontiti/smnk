import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, CardMedia, useMediaQuery, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import { Document, Page, pdfjs } from "react-pdf";
import { SmnkErrorBoundary, theme } from "@/pages/_app";
import { BlackImageFrame } from "../avatar/DashboardDp";
import AddFloatingActionButtons from "../fab/Add";
import { useRouter } from "next/router";
import ViewOnlyImageDialog from "../dialog/ViewOnlyImageDialog";
function CatalogDisplayStepper({
  catalog,
  forClient,
}: {
  forClient: boolean;
  catalog: any[];
}) {
  //configure react-pdf
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();
  //get reference to the image dialog box
  const imageDialogRef = React.useRef();
  const router = useRouter();
  return (
    <SmnkErrorBoundary>
      <Box
        p={1}
        bgcolor={"whitesmoke"}
        maxWidth={"100%"}
        minWidth={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        gap={1}
        flexWrap={"wrap"}
      >
        {!forClient && (
          <AddFloatingActionButtons
            handleClick={() => {
              router.push("/dashboard/catalog/add");
            }}
          />
        )}
        {catalog &&
          catalog.length > 0 &&
          catalog.map((cat: Cat) => (
            <Box
              key={cat.filename}
              onClick={() => {
                //call image dialog ref to update image dialog
                const refState = imageDialogRef.current as any;
                refState.updateCatalogId(cat._id as string);
                refState.updateForClient(forClient);
                refState.updateSrc(`/api/multer/catalog/${cat.filename}`);
                refState.showDialog();
              }}
            >
              <BlackImageFrame
                borderColor={theme.smnk[1200]}
                width={70}
                height={70}
                alt={cat.title}
                src={`/api/multer/catalog/${cat.filename}`}
              />
            </Box>
          ))}
      </Box>
      <ViewOnlyImageDialog ref={imageDialogRef} />
    </SmnkErrorBoundary>
  );
}
type Cat = {
  title: string;
  filename: string;
  description: string;
  contentType: string;
  _id?: string;
};
export default CatalogDisplayStepper;
function CatalogCard({ cat }: { cat: Cat }) {
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  function onDocumentLoadSuccess(numPages: any) {
    setNumPages(numPages);
  }
  const newTheme = useTheme();
  const xs = useMediaQuery(newTheme.breakpoints.down("sm"));
  const sm = useMediaQuery(newTheme.breakpoints.between(600, 900));
  if (!cat) return <p></p>;
  return (
    <Box
      sx={{
        maxWidth: "100%",
        minWidth: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "column",
        minHeight: 300,
      }}
    >
      {cat.contentType && cat.contentType.startsWith("video") && (
        <ReactPlayer
          url={`/api/multer/catalog/${cat.filename}`}
          controls={true}
          width={250}
          maxHeight={200}
          minHeight={200}
        />
      )}
      {cat.contentType && cat.contentType.startsWith("audio") && (
        <ReactPlayer
          url={`/api/multer/catalog/${cat.filename}`}
          controls={true}
          width={250}
          maxHeight={200}
          minHeight={200}
          height={200}
        />
      )}
      {cat.contentType && cat.contentType.startsWith("image") && (
        <CardMedia
          sx={{
            maxHeight: { xs: 300, sm: 400, md: 500 },
            minHeight: { xs: 300, sm: 400, md: 500 },
            width: "100%",
          }}
          image={`/api/multer/catalog/${cat.filename}`}
          title={cat.title}
        />
      )}
      {cat.filename && cat.filename.endsWith(".pdf") && (
        <Box overflow={"scroll"} maxHeight={400} minHeight={400}>
          <Document
            file={`/api/multer/catalog/${cat.filename}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={xs ? 350 : sm ? 600 : 900} />
          </Document>
        </Box>
      )}
      <Box p={2}>
        <Typography fontWeight={"bold"} variant="subtitle1">
          Description:
        </Typography>
        <Typography textTransform={"capitalize"} variant="caption">
          {cat.description}
        </Typography>
      </Box>
    </Box>
  );
}
