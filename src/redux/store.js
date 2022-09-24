import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./taskreducers";
export default configureStore({
    reducer:{
        task:reducer}
})