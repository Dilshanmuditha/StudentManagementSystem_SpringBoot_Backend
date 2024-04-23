import { useEffect, useState } from "react";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const MultipleListItem = ({
  id,
  icon,
  Text,
  path,
  childData,
}: {
  id: number;
  icon: any;
  Text: string;
  path?: any;
  childData: any;
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const listButtonAction = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    const separatePath = path.split('/');
    const firstPath = `/${separatePath[1]}`;
    if(pathname.includes(firstPath)){
      setOpen(true)
    }
  }, [pathname])
  

  return (
    <>
      <ListItemButton onClick={handleClick} key={id}>
        <ListItemIcon sx={{ color: theme.palette.background.default }}>
          {icon}
        </ListItemIcon>
        <ListItemText primary={Text} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding >
        {childData.map((data: any) => (
            <ListItemButton
              sx={{
                pl: 4,
                borderRadius: "10px",
                margin:"5px",
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
              onClick={() => {
                listButtonAction(data.path);
              }}
              key={data.id}
              selected={pathname === data.path ? true : false}
            >
              <ListItemIcon>{data.icon || ""}</ListItemIcon>
              <ListItemText primary={data.label} />
            </ListItemButton>
        ))}
        </List>
      </Collapse>
    </>
  );
};

export default MultipleListItem;
