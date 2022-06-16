import {Navigate, useRoutes} from 'react-router-dom';
import Test from "./admin/layout/test";
import Permission from "./admin/settings/Permission";
import Auth from "./admin/auth/auth";

const BaseRoutes = () => {
    return useRoutes([
        {
            path: '/dashboard',
            element: <Test/>,
            children: [
                {path: '/dashboard/admin', element: <Test/>},
                {path: '/dashboard/admin/permissions', element: <Permission/>},
            ],
        },
        {
            path: '/',
            element: <Auth/>,
            children: [
                { path: 'login', element: <Auth /> },
            ],
        },
        {path: '*', element: <Navigate to="/404" replace/>}])
}

export default BaseRoutes;