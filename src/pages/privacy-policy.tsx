import React from "react";
import { Container, Typography } from "@mui/material";
import Layout from "@/components/layout";
import Head from "next/head";
import Link from "next/link";

function TermsAndConditions() {
  return (
    <Layout>
      <Head>
        <title>SMNK Privacy Policy</title>
      </Head>
      <main>
        <Container sx={{ mt: "1rem" }}>
          <Typography mt={1} mb={5} fontWeight={"bold"}>
            {" "}
            Privacy Policy
          </Typography>
          <Typography fontWeight={"bold"} component={"span"}>
            Effective Date:
          </Typography>
          <Typography mb={2} component={"span"}>
            {" "}
            10th July 2023
          </Typography>
          <Typography mt={2}>
            {`Thank you for visiting 
              `}
            <Link href="https://www.smnklimited.com/">www.smnklimited.com</Link>
            {`
             (the "Website"), owned and operated by SMNK Limited
             ("Company," "we," "us," or "our"). We are committed to protecting your privacy and ensuring the security of
              your personal information. This Privacy Policy outlines the types of information we collect, 
              how we use and protect it, and your rights regarding your personal data.`}
          </Typography>
          <ol>
            <li>
              <Typography> Information We Collect</Typography>
              <ul>
                <li>
                  <Typography fontWeight={"bold"}>
                    {" "}
                    Personal Information:
                  </Typography>
                  <Typography mb={2}>
                    We may collect personal information from you when you
                    voluntarily provide it to us, such as when you fill out
                    contact forms, subscribe to newsletters, or make a purchase.
                    This information may include your name, email address,
                    postal address, phone number, and any other information you
                    provide.
                  </Typography>
                </li>
                <li>
                  <Typography fontWeight={"bold"}>
                    {" "}
                    Automatically Collected Information:
                  </Typography>
                  <Typography mb={2}>
                    We may also collect certain information automatically when
                    you visit our Website. This may include your IP address,
                    browser type, operating system, referring URLs, pages
                    viewed, and other browsing information. We may use cookies
                    and similar technologies to collect this information.
                  </Typography>
                </li>
              </ul>
            </li>
            <li>
              <Typography> Use of Information</Typography>
              <ul>
                <li>
                  <Typography fontWeight={"bold"}>
                    {" "}
                    Personal Information:
                  </Typography>
                  <Typography mb={2}>
                    We may use the personal information you provide to respond
                    to your inquiries, process your requests, send you
                    newsletters or promotional materials, and provide you with
                    information about our products and services. We may also use
                    your information to improve our Website, customize your user
                    experience, and analyze trends.
                  </Typography>
                </li>
                <li>
                  <Typography fontWeight={"bold"}>
                    {" "}
                    Automatically Collected Information:
                  </Typography>
                  <Typography mb={2}>
                    The information we collect automatically helps us understand
                    how users interact with our Website, diagnose technical
                    issues, and improve our services. We may also use this
                    information for statistical analysis, marketing purposes, or
                    to enhance the overall user experience.
                  </Typography>
                </li>
              </ul>
            </li>
            <li>
              <Typography>Data Security</Typography>

              <Typography mb={2}>
                We implement reasonable security measures to protect the
                confidentiality and integrity of your personal information.
                However, please note that no method of transmission over the
                Internet or electronic storage is 100% secure. We cannot
                guarantee the absolute security of your information.
              </Typography>
            </li>
            <li>
              <Typography>Third-Party Disclosure</Typography>

              <Typography mb={2}>
                We may share your personal information with trusted third
                parties, including service providers or business partners, who
                assist us in operating our Website or providing services to you.
                We will ensure that these third parties are obligated to protect
                your information and use it only for the purposes specified by
                us.
              </Typography>
            </li>
            <li>
              <Typography>Your Rights</Typography>

              <Typography mb={2}>
                You have certain rights regarding your personal information,
                including the right to access, correct, or delete your
                information. If you would like to exercise any of these rights,
                please contact us using the information provided below.
              </Typography>
            </li>
            <li>
              <Typography>Links to Third-Party Websites</Typography>

              <Typography mb={2}>
                Our Website may contain links to third-party websites that are
                not operated or controlled by us. We are not responsible for the
                privacy practices of these websites. We encourage you to review
                the privacy policies of any third-party websites you visit.
              </Typography>
            </li>
            <li>
              <Typography>Changes to this Privacy Policy</Typography>

              <Typography mb={2}>
                We reserve the right to modify this Privacy Policy at any time.
                Any changes will be effective when posted on this page. We
                encourage you to review this Privacy Policy periodically for any
                updates.
              </Typography>
            </li>
            <li>
              <Typography>Contact Us</Typography>

              <Typography mb={2}>
                If you have any questions or concerns about this Privacy Policy
                or our data practices, please contact us at [email address].
              </Typography>
            </li>
          </ol>
        </Container>
      </main>
    </Layout>
  );
}

export default TermsAndConditions;
