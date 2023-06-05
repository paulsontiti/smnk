import { useEffect } from "react";
import Layout from "@/components/dashboard/layout";
import { useRouter } from "next/router";
import EditExperience from "@/swDashboard/components/account/editExperience";

export default function EditExperiencePage() {
  const router = useRouter();

  const expIndex = router.query.expId as string;

  
  useEffect(() => {
   
    if ( isNaN(Number(expIndex))) {
      router.push("/sw-dashboard/experience/");
    }
  }, [expIndex, router]);
  return (
    <Layout>
      { !isNaN(Number(expIndex)) && <EditExperience router={router} index={Number(expIndex)} />}
    </Layout>
  );
}
