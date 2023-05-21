import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../components/register/Register";
import Login from "../components/login/Login";
import Orders from "../components/orders/Orders";
import Profile from "../components/profile/Profile";
import AboutUs from "../components/Footer/AboutUs";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "aboutus",
        element: <AboutUs />,
      },
      /*{
        path: "beaches",
        element: <Beaches></Beaches>,
        children: [
          {
            path: ":id",
            element: <Beaches></Beaches>,
          },
        ],
      }, */
    ],
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/profile",
    element: <Profile></Profile>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/orders",
    element: <Orders></Orders>,
  },
]);

export default Router;
