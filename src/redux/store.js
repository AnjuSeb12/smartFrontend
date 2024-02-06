import { configureStore } from "@reduxjs/toolkit";
import userAuth from "./userAuth";
import smartWatches from "./smartWatches";





const store=configureStore({
    reducer:{
        auth:userAuth,
        data:smartWatches,

    }
});
export default store;
