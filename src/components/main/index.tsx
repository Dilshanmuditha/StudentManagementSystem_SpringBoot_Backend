import LayoutComponent from "../layout";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import { MainContainer } from "./styles";



const MainComponent = ({children}:{children:any}) => {
  const [theme, colorMode] = useMode();
  //eslint-disable-next-line
  // const [drawerWidth, setDrawerWidth] = useState<string>("260px");
  const drawerWidth = "260px";
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LayoutComponent drawerWidth={drawerWidth}/>
          <MainContainer drawerwidth={drawerWidth} >
            {children}
          </MainContainer>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default MainComponent;
