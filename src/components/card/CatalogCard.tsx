import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { deleteImageFromCatalog } from "../catalog/AddImage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import GenericDialog from "../dialog/GenericDialog";
import CatalogDeleteAction from "../dialog/actions/CatalogDeleteAction";
import CatalogDeleteContent from "../dialog/contents/CatalogDeleteContent";
import { updateSWExtra } from "@/store/slices/swExtraSlice";
import SnackbarComponent from "../snackbar/SnackBar";
import { AlertColor } from "@mui/material";
import DeleteCatalogBottomNavigation from "../bottomNavigation/DeleteBottomNavigator";



export default function CatalogCard({
  title,
  description,
  src,index
}: {
  title: string;
  src: string;
  description: string;
  index:number
}) {
    const {_id} = useSelector((state:RootState)=>state.users.user)
    const dispatch = useDispatch<AppDispatch>()
  const router = useRouter();
  const [msg, setMsg] = React.useState("");
  const [color, setColor] = React.useState<AlertColor>("error");
      //declare refs
      const dialogRef = React.useRef();
      const snackBarRef = React.useRef();
    const confirmDelete = async(confirm:boolean)=>{
     if(!confirm){
      const refState = dialogRef.current as any;
        refState.closeDialog();
     }else{
        const dialogRefState = dialogRef.current as any;
        dialogRefState.closeDialog();
           const {data,error} = await deleteImageFromCatalog(index,_id)
           if(!error){
            setMsg(data.message);
            setColor("success");
            const refState = snackBarRef.current as any;
            refState.handleClick();
           setTimeout(()=>{
            dispatch(updateSWExtra())
           },3000)
           }else{
            setMsg(data.message);
            setColor("error");
            const refState = snackBarRef.current as any;
            refState.handleClick();
        
           }
     }
    }
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
        <CardMedia
          sx={{
            height: {xs:200,sm:300,md:400},

            width: { xs: 300, sm: 600,md:700 },
          }}
          image={src}
          title={title}
        />
        <CardContent>
          <Typography fontWeight={"bold"} variant="subtitle1">
            Description:
          </Typography>
          <Typography textTransform={"capitalize"} variant="caption">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <DeleteCatalogBottomNavigation
            deleteHandleClick={deleteHandler}
          />
        </CardActions>
      </Card>
      <GenericDialog content={<CatalogDeleteContent/>} actions={<CatalogDeleteAction confirmDelete={
        confirmDelete
      }/>} ref={dialogRef}/>
    </Box>
  </>
  );
}
