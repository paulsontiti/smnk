import { RootState } from "@/store";
import { useSelector } from "react-redux";
import {
  companyInfoSchema,
  companyInfoValues,
} from "@/lib/utils/companyProfile";
import { FormParams, createFormObject } from "@/lib/form";
import FormikContainer from "../form/formikContainer";
import { profileFormControls } from "@/lib/company";
import { CompanyInfo, User } from "@/lib/types/userInfo";
import axios from "axios";
import SnackbarComponent from "../snackbar/SnackBar";
import { useRef, useState } from "react";
import { AlertColor } from "@mui/material";

export default function CompanyForm({ router }: { router: any }) {
  const { user } = useSelector((state: RootState) => state.users);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const [loading, setLoading] = useState(false);
  //declare refs
  const snackBarRef = useRef();

  //sign up submit handler
  const companyProfileSubmitHandler = async (
    values: CompanyInfo,
    user: User,
    router: any
  ) => {
    values.userId = user._id;
    if (values.userId) {
      try {
        const res = await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}api/company-profile/add-company-profile`,
          data: values,
        });
        const data = await res.data;
        if (data.successful) {
          setMsg(data.message);
          setColor("success");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          if (user) {
            setTimeout(() => {
              if (user.typeClass === "company") {
                router.push("/dashboard/company");
              } else {
                router.push("/dashboard/individual");
              }
            }, 2000);
          }
        } else {
          setMsg(data.message);
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
        }
      } catch (err: any) {
        setMsg(err.response.data.message);
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
        return;
      }
    } else {
      setMsg("Bad request!!!!");
      setColor("error");
      const refState = snackBarRef.current as any;
      refState.handleClick();
    }
  };

  //formik submit handler
  const formikSubmitHandler = (values: any, formikHelpers: any) => {
    setLoading(true);
    return new Promise((res) => {
      formikHelpers
        .validateForm()
        .then(async (data: any) => {
          const msg = await companyProfileSubmitHandler(values, user, router);
          setLoading(false);
          res(msg);
        })
        .catch((err: any) => {
          setMsg("An Error occured,please try again later");
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          setLoading(false);
          res(err);
        });
    });
  };
  const formParams: FormParams = {
    formObject: createFormObject(
      formikSubmitHandler,
      companyInfoSchema,
      companyInfoValues,
      profileFormControls
    ),
    buttonLabel: "Save",
    headerTitle: "Create Your Company Profile",
  };
  return (
    <>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer formParams={formParams} loading={loading} />
    </>
  );
}
