import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { logout } from "@/store/slices/userSlice";
import { useRouter } from "next/router";
import GenericDialog from "../dialog/GenericDialog";
import LogoutActions from "../dialog/actions/LogoutActions";
import { useRef } from "react";
import LogoutContent from "../dialog/contents/LogoutContent";

export default function LogoutSwitch() {
  const dispatch = useDispatch<AppDispatch>();
    //declare refs
    const dialogRef = useRef();
  const router = useRouter();

const confirmLogout = (confirm:boolean)=>{
 if(!confirm){
  const refState = dialogRef.current as any;
    refState.closeDialog();
 }else{
  dispatch(logout());
  router.push("/");
 }
}
  const logoutHandler = () => {
    const refState = dialogRef.current as any;
    refState.showDialog();
 
  };

  return (
    <>
      <GenericDialog content={<LogoutContent />} actions={<LogoutActions confirmLogout={confirmLogout}/>} ref={dialogRef} />
      <FormGroup sx={{ ml: 0, mb: 1 }}>
        <FormControlLabel
          control={
            <Switch
              checked
              onChange={logoutHandler}
              aria-label="login switch"
              color="primary"
            />
          }
          label="Logout"
        />
      </FormGroup>
    </>
  );
}
