import {configureStore} from "@reduxjs/toolkit";
import api from "./middleware/api";
import user from "./reducer/user";
import data from "./reducer/data";

export default configureStore({
    reducer: {user,data},
    middleware: [api]
})