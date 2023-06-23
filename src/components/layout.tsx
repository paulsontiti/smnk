import { theme } from "@/pages/_app";
import HomeLogoutAppBar from "./appBar/HomeLogoutAppBar";
import Footer from "./footer/Footer";
import { ThemeProvider } from "@mui/material/styles";

export default function Layout(props: { children: any }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <HomeLogoutAppBar />
        {props.children}
      </ThemeProvider>
      <Footer />
    </>
  );
}
