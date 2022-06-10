import MainLayout from "./admin/layout/main";
import {Route, Routes} from "react-router-dom";
import Auth from "./admin/auth/auth";

const App = () => {
    return <Routes>
            <Route exact={true} path={"/"} element={<Auth/>}/>
            <Route exact={true} path={"/admin"} element={<MainLayout/>}/>
        </Routes>
}
export default App;