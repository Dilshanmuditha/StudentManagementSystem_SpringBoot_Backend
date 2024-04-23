import { Box, Drawer, Typography, useTheme } from "@mui/material";
import logo from "../../../assets/react.svg";
import SidebarList from "./sideBarList";


const SideBar = (props: { drawerwidth: string }) => {
  const theme = useTheme();
  const { drawerwidth } = props;


  const logoArea = (width:string) => {
    return (
      <Box
        sx={{
          position:"fixed",
          display: "flex",
          alignItems: "center",
          gap: 2,
          height: "93px",
          width: {width},
          padding: 2,
          backgroundColor:theme.palette.primary.main,
          zIndex:2
        }}
      >
        <img src={logo} alt="Logo" height={"50px"} width={"70px"} />
        <Typography sx={{ marginTop: "15px" }}>LMS potral</Typography>
      </Box>
    );
  };

  return (
    <>
      <Drawer
        anchor="left"
        variant="permanent"
        sx={{
          width: drawerwidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerwidth,
            boxSizing: "border-box",
            bgcolor: theme.palette.primary.main,
            color: "#ffffff",
          },
        }}
      >
        {logoArea(drawerwidth)}
        <SidebarList />
      </Drawer>
    </>
  );
};

export default SideBar;
