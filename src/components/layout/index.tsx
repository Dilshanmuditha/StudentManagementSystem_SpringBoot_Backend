import SideBar from "./sideBar";
import Header from "./header";
import AlertComponent from "../alert";
import MessageModal from "../messageModalPopup";

const LayoutComponent = (props: { drawerWidth: string }) => {
  const { drawerWidth } = props
  return (
    <>

      <Header drawerwidth={drawerWidth} />
      <SideBar drawerwidth={drawerWidth} />
      <AlertComponent/>
      <MessageModal/>
    </>
  );
};

export default LayoutComponent;