import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import GenericDialog from "../dialog/GenericDialog";
import CatalogDeleteAction from "../dialog/actions/CatalogDeleteAction";
import CatalogDeleteContent from "../dialog/contents/CatalogDeleteContent";
import { updateSWExtra } from "@/store/slices/swExtraSlice";
import SnackbarComponent from "../snackbar/SnackBar";
import { AlertColor } from "@mui/material";
import DeleteCatalogBottomNavigation from "../bottomNavigation/DeleteBottomNavigator";
import axios from "axios";
import { deleteImageFromCatalog } from "../catalog/AddFile";
import ReactPlayer from "react-player";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
export default function CatalogCard({
  title,
  description,
  filename,
  index,
  contentType,
}: {
  title: string;
  filename: string;
  description: string;
  index: number;
  contentType: string;
}) {
  const { _id } = useSelector((state: RootState) => state.users.user);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [msg, setMsg] = React.useState("");
  const [file, setFile] = React.useState<any | null>(null);
  const [color, setColor] = React.useState<AlertColor>("error");
  //declare refs
  const dialogRef = React.useRef();
  const snackBarRef = React.useRef();

  React.useEffect(() => {
    (async () => {
      try {
        if (filename) {
          const res = await axios({
            method: "GET",
            url: `${process.env.SMNK_URL}api/multer/catalog/${filename}`,
          });
          const data = await res.data;
          setFile(data);
        } else {
          console.log("Invalid request");
        }
      } catch (err: any) {
        console.log(err);
        return false;
      }
    })();
  });
  const confirmDelete = async (confirm: boolean) => {
    if (!confirm) {
      const refState = dialogRef.current as any;
      refState.closeDialog();
    } else {
      const dialogRefState = dialogRef.current as any;
      dialogRefState.closeDialog();
      const { data, error } = await deleteImageFromCatalog(index, _id);
      if (!error) {
        setMsg(data.message);
        setColor("success");
        const refState = snackBarRef.current as any;
        refState.handleClick();
        setTimeout(() => {
          dispatch(updateSWExtra());
        }, 3000);
      } else {
        setMsg(data.message);
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
      }
    }
  };
  const deleteHandler = () => {
    const refState = dialogRef.current as any;
    refState.showDialog();
  };
  return (
    <>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        maxWidth="100%"
        minWidth="100%"
      >
        <CatalogMediaCard
          title={title}
          description={description}
          filename={filename}
          contentType={contentType}
        />
        <CardActions>
          <DeleteCatalogBottomNavigation deleteHandleClick={deleteHandler} />
        </CardActions>
        <GenericDialog
          content={<CatalogDeleteContent />}
          actions={<CatalogDeleteAction confirmDelete={confirmDelete} />}
          ref={dialogRef}
        />
      </Box>
    </>
  );
}
function CatalogMediaCard({
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
  const newTheme = useTheme();
  const xs = useMediaQuery(newTheme.breakpoints.down("sm"));
  const sm = useMediaQuery(newTheme.breakpoints.between(600, 900));
  return (
    <Box
      sx={{
        maxWidth: "100%",
        minWidth: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        p: 2,
      }}
    >
      {contentType.startsWith("video") && (
        <ReactPlayer url={`/api/multer/catalog/${filename}`} controls={true} />
      )}
      {contentType.startsWith("audio") && (
        <ReactPlayer url={`/api/multer/catalog/${filename}`} controls={true} />
      )}
      {contentType.startsWith("image") && (
        <CardMedia
          sx={{
            maxWidth: "100%",
            minWidth: "100%",
            width: { xs: 350, sm: 500, md: 600 },
            height: 400,
          }}
          image={`/api/multer/catalog/${filename}`}
          title={title}
        />
      )}
      {filename.endsWith(".pdf") && (
        <Box
          overflow={"scroll"}
          sx={{
            maxWidth: "100%",
            minWidth: "100%",
            maxHeight: 300,
          }}
        >
          <Document
            file={`/api/multer/catalog/${filename}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={xs ? 350 : sm ? 600 : 900} />
          </Document>
        </Box>
      )}
      <Typography fontWeight={"bold"} variant="subtitle1" mt={5}>
        Description:
      </Typography>{" "}
      <Typography textTransform={"capitalize"} variant="caption" mb={2}>
        {description}
      </Typography>
    </Box>
  );
}
