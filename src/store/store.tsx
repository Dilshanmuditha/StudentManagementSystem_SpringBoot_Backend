import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice"
import alertReducer from "../features/alertSlice"
import messageModalReducer from "../features/messageModalSlice"
import { Provider } from "react-redux";

const store = configureStore({
    reducer:{
        user:userReducer,
        alert:alertReducer,
        messageModal:messageModalReducer,
    },
})


function StoreProvider(props: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    );
}

export default StoreProvider