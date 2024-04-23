import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addMessageModal } from "../../../../features/messageModalSlice";

const SingleListItem = ({
  id,
  icon,
  Text,
  path,
  action
}: {
  id: number;
  icon: any;
  Text: string;
  path?: any;
  action?:string
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  
  const listButtonAction = () =>{
    if(action === "navigate"){
      navigate(path)
    }else{
      dispatch(addMessageModal({
        modalState: true,
        modalComponentName: "Logout",
      }))
    }
  }


  return (
    <>
      <ListItemButton
        sx={{
          borderRadius: "10px",
          // "&:hover": {
          //     backgroundColor: "red",
          //   },
            "&.Mui-selected": {
              backgroundColor: theme.palette.primary.light,
            },
            "&.Mui-selected:hover": {
              backgroundColor: theme.palette.primary.light,
            },
        }}
        key={id}
        onClick={()=>{listButtonAction()}}
        selected={pathname === path ? true:false}
      >
        <ListItemIcon sx={{ color: theme.palette.background.default }}>
          {icon}
        </ListItemIcon>
        <ListItemText primary={Text} />
      </ListItemButton>
    </>
  );
};

export default SingleListItem;
