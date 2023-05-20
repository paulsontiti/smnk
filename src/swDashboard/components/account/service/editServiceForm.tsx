import { Box, FormGroup, TextField, Button } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Service,
  serviceDetailsSchema,
  serviceFormControls,
  serviceSubmitHandler,
} from "@/lib/types/service";
import axios from "axios";
import FormikContainer from "@/components/form/formikContainer";
import { FormParams, createFormObject } from "@/lib/form";
import { updateUser } from "@/store/slices/userSlice";

export default function EditServiceForm({ index }: { index: number }) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const {
    user: { services },
  } = useSelector((state: RootState) => state.users);

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
