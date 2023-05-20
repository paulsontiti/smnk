import axios from "axios";
import { FormControls, states } from "../form";
import { date, object, string } from "yup";

export const expDetailsSchema = object({
  title: string().required("Title is required"),
  company: string().required("Company Name is required"),
  address: string().required("Street Address is required"),
  state: string().required("State is required"),
  lga: string().required("L.G.A is required"),
  description: string()
    .max(200, "Role Description should not be more than 200 characters")
    .required("Role Description is required"),
  startDate: date().required("Start Date is required"),
  endDate: date().when("onRole", {
    is: false,
    then: date().required(
      "End Date is required if you are no longer on this role"
    ),
  }),
});

export type Experience = {
  title: string;
  company: string;
  state: string;
  lga: string;
  address: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  onRole: boolean;
};

//sign up submit handler
export const experienceSubmitHandler = async (
  values: Experience,
  router: any,index?:number
) => {

  //get user from local storage
  let user = JSON.parse(
    JSON.parse(JSON.stringify(localStorage.getItem("user")))
  );
  
  //if index that means we are editing experience else we are adding an experience
  
  if(index !== undefined){
    user.experience[index] = values 
  }else{
     user.experience.push(values)
  }
  
  //save the new user details in the localstorage
  localStorage.setItem("user", JSON.stringify(user));
  
  //save to the database
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.SMNK_URL}api/sw-dashboard/experience/edit-experience`,
        data: {experience:user.experience,_id:user._id}
      });
      const data = await res.data;

      alert(data.message);
      if (data.successful) {
        router.push("/sw-dashboard/experience");
      }
    } catch (err: any) {
      console.log(err);
      alert(err.response.data.message);
      return;
    }
 
};

export const expFormControls: FormControls[] = [
  { name: "title", label: "Role Title", control: "input" },
  { name: "company", label: "Company Name", control: "input" },
  { name: "state", label: "State", control: "auto", options: states },
  {
    name: "lga",
    label: "LGA",
    control: "auto",
    options: states,
    fieldToCheckAgainst: "state",valueOfFieldToCheckAgainst:''
  },
  { name: "address", label: "Company Address", control: "input" },
  { name: "description", label: "Role Description", control: "textarea" },
  { name: "startDate", label: "Start Date", control: "date" },
  { name: "onRole", label: "I'm currently on this role", control: "switch" },
  {
    name: "endDate",
    label: "End Date",
    control: "date",
    fieldToCheckAgainst: "onRole",valueOfFieldToCheckAgainst:true
  },
];
