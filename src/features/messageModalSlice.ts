import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MessageModalState {
  modalState: boolean;
  modalComponentName: string;
}

const initialState: MessageModalState = {
  modalState: false,
  modalComponentName: "",
};

const messageModalSlice = createSlice({
  name: "messageModal",
  initialState,
  reducers: {
    addMessageModal: (state, action: PayloadAction<MessageModalState>) => {
      const { modalState, modalComponentName } =
        action.payload;
      state.modalState = modalState;
      state.modalComponentName = modalComponentName;
    },
  },
});

export const { addMessageModal } = messageModalSlice.actions;
export default messageModalSlice.reducer;
