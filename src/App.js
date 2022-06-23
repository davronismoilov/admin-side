import {Routes, Route} from "react-router";
import Permission from "./admin/settings/Permission";
import Auth from "./admin/auth/auth";
import Main from "./admin/layout/main";

const App = () => {
    return (
        <div>
            <Routes>
                <Route element={<Permission/>} path={'/dashboard/permissions'}/>
                <Route element={<Main/>} path={'/dashboard'}/>
                <Route element={<Auth/>} path={'/'}/>
            </Routes>
        </div>
    )
}
export default App;
