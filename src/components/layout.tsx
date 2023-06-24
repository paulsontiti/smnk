import { theme } from "@/pages/_app";
import HomeLogoutAppBar from "./appBar/HomeLogoutAppBar";
import Footer from "./footer/Footer";
import { ThemeProvider } from "@mui/material/styles";
import BackToHistoryBottomNavigation from "./bottomNavigation/BackBottomNavigation";

export default function Layout(props: { children: any }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <HomeLogoutAppBar />
        <BackToHistoryBottomNavigation />
        {props.children}
      </ThemeProvider>
      <Footer />
    </>
  );
}
