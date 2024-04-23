import { PaletteMode, createTheme } from "@mui/material";
import { createContext, useState, useMemo } from "react";


export const themeSetting = ({ mode }: { mode: PaletteMode }) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#024D81",
              light:"#0A7E98"
            },
            secondary: {
              main: "#FFFFFF",
              light:"#0A7E68"
            },
            background: {
              default: "#FFFFFF",
            },
          }
        : {
          primary: {
            main: "#024D81",
            light:"#0A7E98"
          },
          secondary: {
            main: "#FFFFFF",
            light:"#0A7E68"
          },
          background: {
            default: "#FFFFFF",
          },
          }),
    },
    typography: {
      fontFamily: ["Arial"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Arial"].join(","),
        fontSize: 36,
        fontWeight: 700,
      },
      h2: {
        fontFamily: ["Arial"].join(","),
        fontSize: 28,
        fontWeight: 700,
      },
      h3: {
        fontFamily: ["Arial"].join(","),
        fontSize: 18,
        fontWeight: 500,
      },
      h4: {
        fontFamily: ["Arial"].join(","),
        fontSize: 16,
        fontWeight: 700,
      },
      h5: {
        fontFamily: ["Arial"].join(","),
        fontSize: 12,
        fontWeight: 700,
      },
      h6: {
        fontFamily: ["Arial"].join(","),
        fontSize: 14,
        fontWeight: 400,
      },
      h7: {
        fontFamily: ["Arial"].join(","),
        fontSize: 14,
        fontWeight: 400,
      },
      h8: {
        fontFamily: ["Arial"].join(","),
        fontSize: 10,
        fontWeight: 400,
      },
    },
  };
};

export const ColorModeContext = createContext<{ toggleColorMode: () => void }>({
  toggleColorMode: () => {},
});

export const useMode = (): [
  ReturnType<typeof createTheme>,
  { toggleColorMode: () => void }
] => {
  const [mode, setMode] = useState<PaletteMode>("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSetting({ mode })), [mode]);

  return [theme, colorMode];
};