"use client";

import { ErrorBoundary } from "react-error-boundary";
import Providers from "@/store/provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import ErrorAlert from "@/components/alerts/Error";
declare module "@mui/material/styles" {
  interface Theme {
    smnk: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      1000: string;
      1100: string;
      1200: string;
      1300: string;
      1400: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    smnk: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      1000: string;
      1100: string;
      1200: string;
      1300: string;
      1400: string;
    };
  }
  interface PaletteColor {
    light: string;
    main: string;
    dark: string;
  }
  interface PaletteOptions {}
}
const smnkColors = {
  100: "#ECEDFD",
  200: "#C7C8FA",
  300: "#A1A3F7",
  400: "#5659F0",
  500: "#1013BC",
  600: "#0F11A9",
  700: "#0D0F96",
  800: "#OBOD83",
  900: "#0A0C71",
  1000: "#080A5E",
  1100: "#07084B",
  1200: "#04052E",
  1300: "#04023B",
  1400: "#030426",
};

export const theme = createTheme({
  smnk: smnkColors,
  palette: {
    primary: {
      main: smnkColors[1200],
      light: smnkColors[100],
      dark: smnkColors[1200],
    },
    info: {
      main: smnkColors[500],
    },
  },
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Providers>
        <ErrorBoundary fallback={<ErrorAlert />}>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Providers>
    </>
  );
}
