import EditBankDetailsForm from "./editBankDetailsForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function EditBankDetails() {
  const {
    user: { bankDetails },
  } = useSelector((state: RootState) => state.users);
  
  return <p></p>

  // return <EditBankDetailsForm initialValues={bankDetails  && bankDetails} />;
}
