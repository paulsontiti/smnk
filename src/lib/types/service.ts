import axios from "axios";
import { array, object, string } from "yup";
import { NextRouter } from "next/dist/client/router";
import { FormControls } from "../form";

export type Service = {
  _id?: string;
  title: string;
  skills: string[];
  description: string;
  category: string;
};

export const serviceSubmitHandler = async (
  values: Service,
  router: NextRouter,
  index?: number
) => {
  //get user from local storage
  let user = JSON.parse(
    JSON.parse(JSON.stringify(localStorage.getItem("user")))
  );

  if (index !== undefined) {
    user.services[index] = values;
  } else {
    //add service to user if user services is not more than two
    if (user.services.length < 2) {
      user.services.push(values);
    } else {
      alert("You cannot add more than two services");
      return;
    }
  }

  //save the new user details in the localstorage
  localStorage.setItem("user", JSON.stringify(user));

  //save to the database
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.SMNK_URL}api/sw-dashboard/service/edit-service`,
      data: { _id: user._id, services: user.services },
    });
    const data = await res.data;

    alert(data.message);
    if (data.successful) {
      router.push("/sw-dashboard/service");
    }
  } catch (err: any) {
    console.log(err);
    alert(err.response.data.message);
  }
};

export const serviceDetailsSchema = object({
  title: string().required("Title is required"),
  description: string()
    .max(200, "Service Description should not be more than 200 characters")
    .required("Service Description is required"),
  category: string().required("Category is required"),
  skills: array().min(1, "").required("At Least One Skill is required"),
});

