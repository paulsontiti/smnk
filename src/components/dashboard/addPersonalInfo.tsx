import Layout from "@/components/dashboard/layout";
import { useRouter } from "next/router";
import IndividualForm from "@/components/dashboard/individualForm";

export default function AddPersonalInfoForm() {
  const router = useRouter();

  return (
    <Layout>
      <IndividualForm router={router} />
    </Layout>
  );
}
