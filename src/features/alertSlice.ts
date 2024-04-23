import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AlertState {
  alertState: boolean;
  alertType: 'Success' | 'Error' | 'Warning' | 'default';
  alertMassage: string;
  alertDescription: string;
}

const initialState: AlertState = {
  alertState: false,
  alertType: "default",
  alertMassage: "",
  alertDescription: "",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<AlertState>) => {
      const { alertState, alertType, alertMassage, alertDescription } =
        action.payload;
      state.alertState = alertState;
      state.alertType = alertType;
      state.alertMassage = alertMassage;
      state.alertDescription = alertDescription;
    },
  },
});

export const { addAlert } = alertSlice.actions;
export default alertSlice.reducer;
