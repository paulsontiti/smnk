import ChangePassword from "@/account/components/change-password";
import AccountLayout from "@/account/components/layout";
import Layout from "@/components/layout";
import Head from "next/head";
import { SmnkErrorBoundary } from "../_app";

export default function ForgotPasswordPage() {
  return (
    <Layout>
      <AccountLayout>
        <Head>
          <title>Change Password</title>
        </Head>
        <SmnkErrorBoundary>
          <ChangePassword />
        </SmnkErrorBoundary>
      </AccountLayout>
    </Layout>
  );
}
