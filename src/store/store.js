import {configureStore} from "@reduxjs/toolkit";
import api from "./middleware/api";
import user from "./reducer/user";

export default configureStore({
    reducer: {user},
    middleware: [api]
})