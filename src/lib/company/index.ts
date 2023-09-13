import { FormControls, states } from "../form";

export const profileFormControls: FormControls[] = [
  {
    name: "name",
    label: "Company Name",
    control: "input",
    helperText: "What is your company's name?",
  }, {
    name: "state",
    label: "State",
    control: "auto",
    options: states,
    helperText: "State of Residence",
  },
  {
    name: "lga",
    label: "LGA",
    control: "auto",
    options: states,
    fieldToCheckAgainst: "state",
    valueOfFieldToCheckAgainst: "",
    helperText: "L.G.A of residence",
  },
  { name: "officeAddress", label: "Office Address", control: "input",helperText:`Company's office address` },
  { name: "description", label: "Company Description", control: "textarea",helperText:'Describe what you do for clients to see.' },
];
