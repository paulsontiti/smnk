import { RootState, AppDispatch } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { getCompanyProfile } from "@/lib/utils/user";
import useSWR from "swr";
import FormikContainer from "../form/formikContainer";
import { FormParams, createFormObject } from "@/lib/form";
import { profileFormControls } from "@/lib/company";
import { companyInfoSchema } from "@/lib/utils/companyProfile";
import { CompanyInfo } from "@/lib/types/userInfo";
import axios from "axios";
import SnackbarComponent from "../snackbar/SnackBar";
import { useRef, useState } from "react";
import { AlertColor } from "@mui/material";
import ErrorAlert from "../alerts/Error";
import LoadingAlert from "../alerts/Loading";

export default function EditCompanyProfileForm({ router }: { router: any }) {
  const { user } = useSelector((state: RootState) => state.users);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");

  const [loading, setLoading] = useState(false);
  //declare refs
  const snackBarRef = useRef();
  const { data, error } = useSWR("getCompProfile", getCompanyProfile(user._id));

  if (error) return <ErrorAlert />;
  if (!data) return <LoadingAlert />;

  //sign up submit handler
  const companyProfileSubmitHandler = async (values: CompanyInfo) => {
    values.userId = user._id;
    if (values.userId) {
      try {
        const res = await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}api/company-profile/edit-company-profile`,
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
          const msg = await companyProfileSubmitHandler(values);
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
      data,
      profileFormControls
    ),
    buttonLabel: "Save",
    headerTitle: "Edit Your Company Profile",
  };
  return (
    <>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer formParams={formParams} loading={loading} />
    </>
  );
}
