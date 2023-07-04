import React, { useRef, useState } from "react";
import { AlertColor } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import SnackbarComponent from "../snackbar/SnackBar";
import { updateSWExtra } from "@/store/slices/swExtraSlice";
import FormikContainer from "../form/formikContainer";
import { object, string } from "yup";
import { FormControls, FormParams, createFormObject } from "@/lib/form";

function AddFile() {
  const [initialValues, setInitiaValues] = useState({
    title: "",
    description: "",
    catalog: null,
  });
  const { _id } = useSelector((state: RootState) => state.users.user);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const dispatch = useDispatch<AppDispatch>();
  //declare refs
  const snackBarRef = useRef();
  const router = useRouter();

  //formik submit handler
  const formikSubmitHandler = (values: any, formikHelpers: any) => {
    setInitiaValues(values);
    return new Promise((res) => {
      formikHelpers
        .validateForm()
        .then(async (data: any) => {
          try {
            //checkif the file is valid
            const isFileValid = validCatalogFile(values.catalog);
            if (isFileValid === "valid") {
              const formData = new FormData();
              formData.append("userId", _id);
              formData.append("cat", values.catalog);
              formData.append("title", values.title);
              formData.append("description", values.description);

              const res = await axios({
                method: "POST",
                url: `${process.env.SMNK_URL}/api/multer/catalog`,
                data: formData,
              });
              const data = await res.data;

              if (data.successful) {
                //get swExtra from local storage
                let swExtra = JSON.parse(
                  JSON.parse(JSON.stringify(localStorage.getItem("swExtra")))
                );
                if (swExtra.catalog) {
                  swExtra.catalog.push({
                    filename: data.resData,
                    title: values.title,
                    description: values.description,
                  });
                } else {
                  swExtra.catalog = [];
                  swExtra.catalog.push({
                    filename: data.resData,
                    title: values.title,
                    description: values.description,
                  });
                }
                //save the new user details in the localstorage
                localStorage.setItem("swExtra", JSON.stringify(swExtra));
                dispatch(updateSWExtra());
                setMsg(data.message);
                setColor("success");
                const refState = snackBarRef.current as any;
                refState.handleClick();
                setTimeout(() => {
                  router.push("/dashboard/catalog");
                }, 6000);
              } else {
                setMsg(data.message);
                setColor("error");
                const refState = snackBarRef.current as any;
                refState.handleClick();
              }
            } else {
              setMsg(isFileValid);
              setColor("error");
              const refState = snackBarRef.current as any;
              refState.handleClick();
              res(data);
            }
          } catch (err: any) {
            setMsg("An error occurred ,please try again");
            setColor("error");
            const refState = snackBarRef.current as any;
            refState.handleClick();
            console.log(err);
            res(err);
          }
          res(data);
        })
        .catch((err: any) => {
          setMsg(err.message);
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          console.log("Error from formik ", err);
          res(err);
        });
    });
  };

  const validationSchema = object({
    title: string().required("Title is required"),
    description: string()
      .max(100, "Description should not be more than 100 characters")
      .required("Description is required"),
  });

  const reportFormControls: FormControls[] = [
    {
      name: "title",
      label: "Title",
      control: "input",
      helperText: "Give a title to this file. This will be shown to clients",
    },
    {
      name: "description",
      label: "Description",
      control: "textarea",
      helperText:
        "Give a brief description of the file. What story does the image tell?",
    },
    { name: "catalog", label: "Select a file", control: "file" },
  ];

  const formParams: FormParams = {
    formObject: createFormObject(
      formikSubmitHandler,
      validationSchema,
      initialValues,
      reportFormControls
    ),
    buttonLabel: "Add",
    headerTitle: `Add To Your Catalog`,
  };

  return (
    <>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer formParams={formParams} />
      {/* <form
        onSubmit={submitHandler}
        encType="multipart/form-data"
      >
        <IconButton color="primary" type="submit">
          {
            
          file  && (
            <>
              <Image src={displayFile} alt="image to upload" width={100} height={100}/>
              <LoadingButton
                loading={uploading}
                loadingPosition="start"
                startIcon={<UploadIcon sx={{ color: `${color}.900` }} />}
              ></LoadingButton>
            </>
          )}
        </IconButton>
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input
            name="cat"
            onChange={handleChange}
            hidden
            accept="image/*"
            type="file"
          />
                        <PhotoCamera />
          {!file && <>
                        <Typography sx={{marginRight:'1rem'}} component='span'>Select an image</Typography>
                    </>}
        </IconButton>
      </form> */}
    </>
  );
}

export default AddFile;

function validCatalogFile(catalog: any) {
  switch (true) {
    case !catalog: {
      return "Invalid request,select a file";
    }
    case catalog.size > 10000000: {
      return "File can not be more than 10mb";
    }
    case !(
      catalog.type.startsWith("image") ||
      catalog.type.startsWith("video") ||
      catalog.type.startsWith("audio") ||
      catalog.name.endsWith(".pdf")
    ): {
      return "Invalid file!!! Only Images,audio,videos and pdf are allowed";
    }
    default:
      return "valid";
  }
}
export function getCatalogFromLocalStorage() {
  //get swExtra from local storage
  let swExtra = JSON.parse(
    JSON.parse(JSON.stringify(localStorage.getItem("swExtra")))
  );
  return swExtra;
}

function deleteCatalogFromLocalStorage(index: number) {
  const swExtra = getCatalogFromLocalStorage();
  swExtra.catalog = swExtra.catalog.filter(
    (cat: any, i: number) => i !== index
  );
  //save the new user details in the localstorage
  localStorage.setItem("swExtra", JSON.stringify(swExtra));
  return swExtra.catalog;
}
export async function deleteImageFromCatalog(index: number, userId: string) {
  const catalog = deleteCatalogFromLocalStorage(index);
  let data, error;
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.SMNK_URL}/api/multer/catalog/delete`,
      data: { catalog, userId },
    });
    data = await res.data;
  } catch (err) {
    console.log(err);
    error = err;
  }
  return { data, error };
}
