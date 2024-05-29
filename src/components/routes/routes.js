import AddPost from "../pages/AddPost"
import Home from "../pages/Home"
import MyPost from "../pages/MyPost"
import Signin from "../pages/Signin"
import Signup from "../pages/Signup"



export const publicRoutes = [
    {
        name: " signin ",
        path: "/signin ",
        element: Signin
    },
    {
        name: "signup",
        path: "/signup",
        element: Signup
    },
]

export const privateRoutes = [
    {
        name: "home",
        path: "/",
        element: Home
    },
    {
        name: "addpost",
        path: "/addpost",
        element: AddPost
    },
    {
        name: "mypost",
        path: "/mypost",
        element: MyPost
    },
]