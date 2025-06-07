import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import ErrorPage from "../Errorpage/Errorpage";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import AddBlog from "../Pages/AddBlog";
import PrivateRoute from "../PrivateRoute.jsx/PrivateRoute";
import WishList from "../Pages/WishList";
import AllBlog from "../Pages/AllBlog/AllBlog";
import ServerError from "../Component/ServerError/ServerError";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                path: '/',
                Component: Home
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'addblog',
                element: <PrivateRoute><AddBlog></AddBlog></PrivateRoute>
            },
            {
                path: 'wishlist',
                element: <PrivateRoute><WishList></WishList></PrivateRoute>
            },
            {
                path: 'allblog',
                Component: AllBlog,
                loader: () => fetch('https://blog-server-three-inky.vercel.app/allblog'),
                errorElement:<ServerError/>
                
            }
        ]
    },
    {
        path: '*',
        Component: ErrorPage
    }
])