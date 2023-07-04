import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
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
        m={1}
        display={"center"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Card
          sx={{
            maxWidth: { sm: "70%", lg: "50%" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <CardContent>
            <CatalogMediaCard
              title={title}
              description={description}
              filename={filename}
              contentType={contentType}
            />
          </CardContent>
          <CardActions>
            <DeleteCatalogBottomNavigation deleteHandleClick={deleteHandler} />
          </CardActions>
        </Card>
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
  return (
    <Card
      sx={{
        maxWidth: { sm: "70%", lg: "50%" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
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
          <Box overflow={"scroll"} maxHeight={200}>
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
