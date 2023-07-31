import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";
import ReactPlayer from "react-player";
import { Document, Page, pdfjs } from "react-pdf";
import { SmnkErrorBoundary } from "@/pages/_app";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
export default function FileReaderCard({
  filename,
  contentType,
}: {
  filename: string;
  contentType: string;
}) {
  return (
    <>
      <Box
        maxWidth={{ xs: 300, sm: 600 }}
        minWidth={{ xs: 300, sm: 600 }}
        minHeight={{ xs: 300, sm: 600 }}
      >
        <CatalogMediaCard filename={filename} contentType={contentType} />
      </Box>
    </>
  );
}
function CatalogMediaCard({
  filename,
  contentType,
}: {
  filename: string;
  contentType: string;
}) {
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  function onDocumentLoadSuccess(numPages: any) {
    setNumPages(numPages);
  }
  return (
    <SmnkErrorBoundary>
      <Card
        sx={{
          width: { xs: 300, sm: 600 },
        }}
      >
        <CardContent>
          {contentType.startsWith("video") && (
            <ReactPlayer
              url={`/api/multer/proposal/${filename}`}
              controls={true}
              width={"100%"}
              height={300}
            />
          )}
          {contentType.startsWith("audio") && (
            <ReactPlayer
              url={`/api/multer/proposal/${filename}`}
              controls={true}
              width={"100%"}
              height={300}
            />
          )}
          {contentType.startsWith("image") && (
            <CardMedia
              sx={{
                height: { xs: 300, sm: 600 },
                width: { xs: 300, sm: 600 },
              }}
              image={`/api/multer/proposal/${filename}`}
            />
          )}
          {filename.endsWith(".pdf") && (
            <Box
              overflow={"scroll"}
              sx={{
                height: { xs: 300, sm: 600 },
                width: { xs: 300, sm: 600 },
              }}
            >
              <Document
                file={`/api/multer/proposal/${filename}`}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} width={250} />
              </Document>
            </Box>
          )}
        </CardContent>
      </Card>
    </SmnkErrorBoundary>
  );
}
