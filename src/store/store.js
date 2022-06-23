import {configureStore} from "@reduxjs/toolkit";
import api from "./middleware/api";
import user from "./reducer/user";
import course from "./reducer/course";

export default configureStore({
    reducer: {user,course},
    middleware: [api]
})