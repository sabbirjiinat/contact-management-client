import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import HomePage from "../pages/HomePage/HomePage";
import SingUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import AddContact from "../pages/AddContact/AddContact";
import AllContact from "../pages/AllContact/AllContact";
import PrivateRoute from "./PrivateRoute";
import SharedContact from "../pages/SharedContact/SharedContact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/addContact",
        element: <PrivateRoute><AddContact /></PrivateRoute>,
      },
      {
        path: "/allContact",
        element: <PrivateRoute><AllContact /></PrivateRoute>,
      },
      {
        path: "/sharedContact",
        element: <PrivateRoute><SharedContact/></PrivateRoute>,
      },
      {
        path:'/signUp',
        element:<SingUp/>
      },
      {
        path:'/login',
        element:<Login/>
      }
    ],
  },
]);

export default router;
