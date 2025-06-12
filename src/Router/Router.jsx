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
import BlogDetail from "../Pages/BlogDetail";
import UpdateBlog from "../Pages/UpdateBlog";
import TopInTable from "../Pages/TopInTable";
import FeatureBlog from "../Pages/FeatureBlog";

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
                path: 'allblog',
                Component: AllBlog,
                loader: () => fetch('https://blog-server-three-inky.vercel.app/allblog'),
                errorElement:<ServerError/>            
            },
            {
                path:'blogdetails/:id',
                loader: () => fetch('https://blog-server-three-inky.vercel.app/allblog'),
                element: <PrivateRoute><BlogDetail/></PrivateRoute>
            },
                        {
                path: 'updateblog/:id',
                element: <PrivateRoute><UpdateBlog/></PrivateRoute>,
                errorElement:<ServerError/>
            },
            {
                path:'table',
                element:<TopInTable/>

            },
            {
                path:'wishlist',
                loader: () => fetch('https://blog-server-three-inky.vercel.app/allblog'),
                element:<PrivateRoute><WishList></WishList></PrivateRoute>
            },
            {
                path:'featureblog',
                loader: () => fetch('https://blog-server-three-inky.vercel.app/feature_blog'),
                element:<FeatureBlog/>
            }
        ]
    },
    {
        path: '*',
        Component: ErrorPage
    }
])