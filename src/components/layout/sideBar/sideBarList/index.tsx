import { Divider, List } from "@mui/material";
import ROUTES from "../../../../routes/routeConfig";
import SingleListItem from "./singleListItem";
import MultipleListItem from "./multipleListItem";

const SidebarList = () => {
  const userRoutes = [1, 2, 3, 4, 5, 6, 7];

  const logOutListItem = ROUTES.find((data: any) => data.id == 100);

  const topFilteredRoutes = ROUTES.filter(
    (data: any) => userRoutes.includes(data.id) && data.main === true && data.sidebar === true
  );

  const bottomFilteredRoutes = [
    ...ROUTES.filter(
      (data: any) => userRoutes.includes(data.id) && data.main === false && data.sidebar === true
    ),
    logOutListItem,
  ];

  return (
    <>
      <div style={{ marginTop:"93px",marginBottom: "10px" }}>
        <List>
          {topFilteredRoutes.map((data: any, index: number) => {
            if (data.children.length == 0) {
              return (
                <div style={{ padding: "10px" }} key={index}>
                  <SingleListItem
                    id={data.id}
                    icon={data.icon}
                    Text={data.label}
                    path={data.path}
                    action={data.action}
                  />
                </div>

              );
            } else {
              return (
                <div style={{ padding: "10px" }} key={index}>
                  <MultipleListItem
                    id={data.id}
                    icon={data.icon}
                    Text={data.label}
                    path={data.path}
                    childData={data.children}
                  />
                </div>
              );
            }
          })}
        </List>
      </div>
      <div style={{ marginTop: "auto", paddingBottom: "10px" }}>
        <Divider variant="middle" />
        <List>
          {bottomFilteredRoutes.map((data: any, index: number) => {
            if (data.children.length == 0) {
              return (
                <SingleListItem
                  key={index}
                  id={data.id}
                  icon={data.icon}
                  Text={data.label}
                  path={data.path}
                  action={data.action}
                />
              );
            } else {
              return (
                <div style={{ padding: "10px" }} key={index}>
                  <MultipleListItem
                    id={data.id}
                    icon={data.icon}
                    Text={data.label}
                    path={data.path}
                    childData={data.children}
                  />
                </div>
              );
            }
          })}
        </List>
      </div>
    </>
  );
};

export default SidebarList;
