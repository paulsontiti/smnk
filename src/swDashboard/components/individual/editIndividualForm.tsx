import { AlertColor } from "@mui/material";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getUserProfile } from "@/lib/utils/user";
import FormikContainer from "@/components/form/formikContainer";
import { FormControls, FormParams, createFormObject, states } from "@/lib/form";
import { useEffect, useRef, useState } from "react";
import LoadingAlert from "@/components/alerts/Loading";
import axios from "axios";
import { IndividualPersonalInfo } from "@/lib/types/userInfo";
import { object, string } from "yup";
import SnackbarComponent from "@/components/snackbar/SnackBar";

const individualInfoSchema = object({
  firstName: string().required("First Name is required"),
  lastName: string().required("Last Name is required"),
  userName: string().required("Username is required"),
  address: string().required("Street Address is required"),
  state: string().required("State is required"),
  lga: string().required("L.G.A is required"),
  description: string()
    .max(200, "Description should not be more than 200 characters")
    .required("Description is required"),
});

export default function EditIndividualInfoForm() {
  const router = useRouter();

  const { _id } = useSelector((state: RootState) => state.users.user);
  const [data, setData] = useState<any>();

  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const [loading, setLoading] = useState(false);
  //declare refs
  const snackBarRef = useRef();

  useEffect(() => {
    (async () => {
      const res = await getUserProfile(_id);
      setData(res.data);
    })();
  }, [_id]);

  if (!data) return <LoadingAlert />;

  //sign up submit handler
  const editInfoSubmitHandler = async (values: IndividualPersonalInfo) => {
    if (_id) {
      try {
        const res = await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}api/personal-info/edit-personal-info`,
          data: values,
        });
        const data = await res.data;
        if (data.infoEdited) {
          setMsg(data.message);
          setColor("success");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          setTimeout(() => {
            router.push("/dashboard/individual");
          }, 3000);
        } else {
          setMsg(data.message);
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
        }
      } catch (err: any) {
        console.log(err);
        setMsg(err.response.data.message);
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
      }
    } else {
      alert("Bad request!!!! No user id");
    }
  };

  //formik submit handler
  const formikSubmitHandler = (values: any, formikHelpers: any) => {
    return new Promise((res) => {
      formikHelpers
        .validateForm()
        .then(async (data: any) => {
          const msg = await editInfoSubmitHandler(values);
          res(msg);
        })
        .catch((err: any) => {
          setMsg(err.message);
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
        });
    });
  };

  const infoFormControls: FormControls[] = [
    { name: "firstName", label: "First Name", control: "input" },
    { name: "lastName", label: "Last Name", control: "input" },
    { name: "userName", label: "User Name", control: "input" },
    { name: "state", label: "State", control: "auto", options: states },
    {
      name: "lga",
      label: "LGA",
      control: "auto",
      options: states,
      fieldToCheckAgainst: "state",
    },
    { name: "address", label: "Address", control: "input" },
    { name: "description", label: "Description", control: "textarea" },
  ];

  const formParams: FormParams = {
    formObject: createFormObject(
      formikSubmitHandler,
      individualInfoSchema,
      data,
      infoFormControls
    ),
    buttonLabel: "Submit",
    headerTitle: "Edit Your Profile",
  };
  return (
    <>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer formParams={formParams} loading={loading} />
    </>
  );
}
