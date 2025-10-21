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
import About from "../Pages/About";
import Contact from "../Pages/Contact";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                path: '/',
                Component: Home,
                errorElement:<ServerError/>
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
                element: <PrivateRoute><AddBlog></AddBlog></PrivateRoute>,
                errorElement:<ServerError/>
            },
            {
                path: 'allblog',
                Component: AllBlog,
                loader: () => fetch('http://localhost:3000/allblog'),
                errorElement:<ServerError/>            
            },
            {
                path:'blogdetails/:id',
                element: <PrivateRoute><BlogDetail/></PrivateRoute>,
                errorElement:<ServerError/>
            },
            {
                path: 'updateblog/:id',
                element: <PrivateRoute><UpdateBlog/></PrivateRoute>,
                errorElement:<ServerError/>,
            },
            {
                path:'table',
                element:<TopInTable/>,
                errorElement:<ServerError/>

            },
            {
                path:'wishlist',
                loader: () => fetch('http://localhost:3000/allblog'),
                element:<PrivateRoute><WishList></WishList></PrivateRoute>,
                errorElement:<ServerError/>
            },
            {
                path:'featureblog',
                loader: () => fetch('http://localhost:3000/feature_blog'),
                element:<FeatureBlog/>,
                errorElement:<ServerError/>
            },
            {
                path:'/aboutus',
                element:<About/>

            },
            {
                path:'/contactus',
                element:<Contact/>
            }
        ]
    },
    {
        path: '*',
        Component: ErrorPage
    }
])