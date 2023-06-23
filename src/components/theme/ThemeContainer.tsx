import Box from "@mui/material/Box";

import { useTheme } from "@mui/material/styles";
export default function ThemeContainer({ children }: { children: any }) {
  const theme = useTheme();
  return <Box bgcolor={theme.smnk[1200]} color={theme.smnk[100]}>{children}</Box>;
}
