import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import Notification from "../../notification";
import { useNavigate } from "react-router-dom";

const Header = (props: { drawerwidth: string }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { drawerwidth } = props;
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: `calc(100% - ${drawerwidth})`,
          height: "93px",
          ml: drawerwidth,
          backgroundColor: theme.palette.secondary.main,
          color: "#000",
          borderBottom: 1,
          borderColor: "#afafaf92",
        }}
      >
        <Toolbar sx={{ height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
              width: "100%",
              gap: 5,
            }}
          >
            {/* <Notification /> */}
            <Typography>User Name</Typography>
            <Avatar
              sx={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/profile");
              }}
            >
              UN
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
