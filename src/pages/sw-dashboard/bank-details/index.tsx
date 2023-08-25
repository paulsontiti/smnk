import Layout from "@/components/dashboard/layout";
import UserBankDetails from "@/components/pay-sw";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function BankDetailsPage() {
  const { _id } = useSelector((state: RootState) => state.users.user);
  return (
    <Layout>
      <UserBankDetails userId={_id} />
    </Layout>
  );
}
