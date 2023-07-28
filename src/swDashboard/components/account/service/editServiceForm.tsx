import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import {
  Service,
  SnackBarParams,
  serviceDetailsSchema,
  serviceSubmitHandler,
} from "@/lib/types/service";
import FormikContainer from "@/components/form/formikContainer";
import { FormControls, FormParams, createFormObject } from "@/lib/form";
import { createSetFromArray, fetchTalents } from "@/lib/search";
import { AlertColor } from "@mui/material";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import ErrorAlert from "@/components/alerts/Error";
import { updateSWExtra } from "@/store/slices/swExtraSlice";

export default function EditServiceForm({ index }: { index: number }) {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  //declare refs
  const snackBarRef = useRef();
  const {
    users: {
      user: { _id },
    },
    swExtra: {
      swExtra: { services },
    },
  } = useSelector((state: RootState) => state);

  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const data = await fetchTalents();

      setOptions(createSetFromArray(data));
    })();
  }, []);
  useEffect(() => {
    if (index === undefined) {
      router.push("/sw-dashboard/service");
    }
  }, [index, router]);
  //get the experience to edit
  const servObj = services && services[index];

  //copy nto another experience object
  const serv: Service = { ...servObj };

  //formik submit handler
  const formikSubmitHandler = (values: any, formikHelpers: any) => {
    setLoading(true);
    return new Promise((res) => {
      formikHelpers
        .validateForm()
        .then(async (data: any) => {
          const snackbarParams: SnackBarParams = {
            setMsg,
            setColor,
            snackBarRef,
          };
          const msg = await serviceSubmitHandler(
            _id,
            values,
            router,
            snackbarParams,
            index
          );
          dispatch(updateSWExtra());
          setLoading(false);
          res(msg);
        })
        .catch((err: any) => {
          setMsg(err.message);
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          console.log("Error from formik ", err);
          setLoading(false);
          res(err);
        });
    });
  };
  const serviceFormControls: FormControls[] = [
    { name: "title", label: "Service Title", control: "input" },
    { name: "skills[0]", label: "Skill One", control: "input" },
    { name: "skills[1]", label: "Skill Two", control: "input" },
    {
      name: "category",
      label: "Category",
      control: "freesolo",
      options: options,
    },
    { name: "description", label: "Service Description", control: "textarea" },
  ];
  const formParams: FormParams = {
    formObject: createFormObject(
      formikSubmitHandler,
      serviceDetailsSchema,
      serv,
      serviceFormControls
    ),
    buttonLabel: "Edit Service",
    headerTitle: "Edit Your Service",
  };
  if (!services || index === undefined)
    return <ErrorAlert message="No service selected for editing" />;
  return (
    <>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer formParams={formParams} loading={loading} />
    </>
  );
}
