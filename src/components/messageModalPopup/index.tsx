import { Modal } from "@mui/material";
import { useSelector } from "react-redux";
import LogOut from "./logout";

const MessageModal = () => {
  const messageModalData = useSelector((state: any) => state.messageModal);

  

  const mainComponent = (name: string) => {
    switch (name) {
      case "Logout":
        return <LogOut/>
      default:
        return <></>
    }
  };
  return (
    <>
      <Modal
        open={messageModalData.modalState}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
        {mainComponent(messageModalData?.modalComponentName)}
        </>
      </Modal>
    </>
  );
};

export default MessageModal;
