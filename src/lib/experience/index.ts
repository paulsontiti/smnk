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
  _id?:string
};



export const expFormControls: FormControls[] = [
  { name: "title", label: "Role Title", control: "input",helperText:'What did you do for your employer' },
  { name: "company", label: "Company Name", control: "input",helperText:'What was the name of your employer' },
  { name: "state", label: "State", control: "auto", options: states,helperText:'What state was your employer'},
  {
    name: "lga",
    label: "LGA",
    control: "auto",
    options: states,
    fieldToCheckAgainst: "state",valueOfFieldToCheckAgainst:'',helperText:'What Local Government Area was your employer'
  },
  { name: "address", label: "Company Address", control: "input",helperText:'What was the office address of your employer'},
  { name: "description", label: "Role Description", control: "textarea",helperText:'Give a short description of your role/job/duty' },
  { name: "startDate", label: "Start Date", control: "date",helperText:'When did you start this job' },
  { name: "onRole", label: "Turn the switch on if you are still on this role", control: "switch" },
  {
    name: "endDate",
    label: "End Date",
    control: "date",
    fieldToCheckAgainst: "onRole",valueOfFieldToCheckAgainst:true,helperText:'When did you finish this job'
  },
];
