import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userLoggedIng:boolean;
  userData: any | null;
  userImage: string | null;
  userRole:string | null;
  authorizedRout: number[];
}

const initialState: UserState = {
  userLoggedIng:false,
  userData: null,
  userImage: null,
  userRole:null,
  authorizedRout: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserState>) => {
      const { userImage, authorizedRout, userRole, userData, userLoggedIng } = action.payload;
      state.userImage = userImage;
      state.authorizedRout = authorizedRout;
      state.userRole = userRole;
      state.userData = userData;
      state.userLoggedIng = userLoggedIng; 
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
