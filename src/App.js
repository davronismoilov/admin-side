import {Routes, Route} from "react-router";
import Test from "./admin/layout/test";
import Permission from "./admin/settings/Permission";
import Auth from "./admin/auth/auth";

const App = () => {
    return (
        <div>
            <Routes>
                <Route element={<Permission/>} path={'/dashboard/permissions'}/>
                <Route element={<Test/>} path={'/dashboard'}/>
                <Route element={<Auth/>} path={'/login'}/>
                <Route element={<Auth/>} path={'/'}/>
            </Routes>
        </div>
    )
}
export default App;
