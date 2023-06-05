import { Box, FormGroup, TextField, Button } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Service,
  serviceDetailsSchema,
  serviceSubmitHandler,
} from "@/lib/types/service";
import FormikContainer from "@/components/form/formikContainer";
import { FormControls, FormParams, createFormObject } from "@/lib/form";
import { updateUser } from "@/store/slices/userSlice";
import { fetchTalents } from "@/lib/search";

export default function EditServiceForm({ index }: { index: number }) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const {
    user: { services },
  } = useSelector((state: RootState) => state.users);

  const [options,setOptions] = useState<any[]>([])

  useEffect(()=>{
(
  async()=>{
    const data = await fetchTalents()
    const setOption = new Set(data.flat())
      const options:any[] = []
      setOption.forEach((val)=>{
       options.push(val)
      })
    setOptions(options)
  }
)()
  },[])
  useEffect(() => {
    if (index === undefined) {
      router.push("/sw-dashboard/service");
    }
  }, [index,router]);
  //get the experience to edit
  const servObj = services && services[index];

  //copy nto another experience object
  const serv: Service = { ...servObj };

  //formik submit handler
  const formikSubmitHandler = (values: any, formikHelpers: any) => {
    return new Promise((res) => {
      formikHelpers
        .validateForm()
        .then(async (data: any) => {
          const msg = await serviceSubmitHandler(values, router, index);
          dispatch(updateUser());
          res(msg);
        })
        .catch((err: any) => {
          console.log("Error from formik ", err);
          res(err);
        });
    });
  };
  const serviceFormControls: FormControls[] = [
    { name: "title", label: "Service Title", control: "input" },
    { name: "skills[0]", label: "Skill One", control: "input" },
    { name: "skills[1]", label: "Skill Two", control: "input" },
    { name: "category", label: "Category", control: "freesolo",options:options },
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
  if (!services || index === undefined) return <p></p>;
  return <FormikContainer formParams={formParams} />;
}
