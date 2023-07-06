import { theme } from "@/pages/_app";
import HomeLogoutAppBar from "./appBar/HomeLogoutAppBar";
import Footer from "./footer/Footer";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme, useMediaQuery, Box } from "@mui/material";
import DesktopHomeAppBar from "./appBar/DesktopHomeAppBar";

export default function Layout(props: { children: any }) {
  const newTheme = useTheme();
  const mediaQuery = useMediaQuery(newTheme.breakpoints.up("sm"));

  return (
    <Box bgcolor="#F4F5F6" sx={{ color: theme.smnk[1200] }}>
      <ThemeProvider theme={theme}>
        {mediaQuery ? <DesktopHomeAppBar /> : <HomeLogoutAppBar />}
        {props.children}
      </ThemeProvider>
      <Footer />
    </Box>
  );
}
