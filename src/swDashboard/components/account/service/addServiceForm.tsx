import { useRouter } from "next/router";
import {
  Service,
  SnackBarParams,
  serviceDetailsSchema,
  serviceSubmitHandler,
} from "@/lib/types/service";
import { FormControls, FormParams, createFormObject } from "@/lib/form";
import FormikContainer from "@/components/form/formikContainer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useEffect, useRef, useState } from "react";
import {
  createSetFromArray,
  fetchCategories,
  fetchServiceTitles,
} from "@/lib/search";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { AlertColor } from "@mui/material";
import { updateSWExtra } from "@/store/slices/swExtraSlice";
import { serviceCategories } from "@/components/card/ServiceCategories";

export default function AddServiceForm() {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [serviceTitles, setServiceTitles] = useState<any[]>([]);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const dispatch = useDispatch<AppDispatch>();
  const { _id } = useSelector((state: RootState) => state.users.user);
  //declare refs
  const snackBarRef = useRef();

  const router = useRouter();
  useEffect(() => {
    (async () => {
      const data = await fetchCategories();
      const services = serviceCategories.map((servCat) => servCat.title);
      setOptions(createSetFromArray(data.flat().concat(services)));
      const res = await fetchServiceTitles();
      setServiceTitles(res);
    })();
  }, []);

  const initialValues: Service = {
    title: "",
    skills: [],
    description: "",
    category: "",
  };

  //formik submit handler
  const formikSubmitHandler = (values: any, formikHelpers: any) => {
    if (values) {
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
              snackbarParams
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
    } else {
      setMsg("Invalid request!!");
      setColor("error");
      const refState = snackBarRef.current as any;
      refState.handleClick();
    }
  };
  const serviceFormControls: FormControls[] = [
    {
      name: "title",
      label: "Service Title",
      control: "freesolo",
      helperText: "What is the title of your service",
      options: serviceTitles,
    },
    {
      name: "skills[0]",
      label: "Skill One",
      control: "input",
      helperText: "What skill do you have for this service title",
    },
    {
      name: "skills[1]",
      label: "Skill Two",
      control: "input",
      helperText: "What other skill do you have for this service title",
    },
    {
      name: "category",
      label: "Category",
      control: "freesolo",
      options: options,
      helperText: "In what category does your skill fall in?",
    },
    {
      name: "description",
      label: "Service Description",
      control: "textarea",
      helperText: "Describe yourself to your potential customers",
    },
  ];

  const formParams: FormParams = {
    formObject: createFormObject(
      formikSubmitHandler,
      serviceDetailsSchema,
      initialValues,
      serviceFormControls
    ),
    buttonLabel: "Add Service",
    headerTitle: "Add Your Service",
  };
  return (
    <>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer formParams={formParams} loading={loading} />
    </>
  );
}
