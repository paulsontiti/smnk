import { ColorPaletteProp, Sheet } from '@mui/joy'
import React from 'react'

function ThemeContainer({children}:{children:any}) {
    const [color, setColor] = React.useState<ColorPaletteProp>("primary");

  return (
    <Sheet
    variant="solid"
    color={color}
    invertedColors
    sx={{
      ...(color !== "warning" && {
        bgcolor: `${color}.900`,
        position: "static",
      }),
      flexGrow: 1,
      borderRadius: { xs: 0, sm: "xs" },
      m: "0 0 1rem 0",
    }}
  >
    {children}
    </Sheet>
  )
}

export default ThemeContainer