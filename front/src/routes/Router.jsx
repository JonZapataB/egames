import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../components/register/Register";
import Login from "../components/login/Login";
import Orders from "../components/orders/Orders";
import Profile from "../components/profile/Profile";
import Shipping from "../components/shipping/Shipping";
import Payment from "../components/payment/Payment";
import PlaceOrder from "../components/placeOrder/PlaceOrder";
import AboutUs from "../components/Footer/AboutUs";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
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
  {
    path: "/shipping",
    element: <Shipping></Shipping>,
  },
  {
    path: "/payment",
    element: <Payment></Payment>,
  },
  {
    path: "/placeorder",
    element: <PlaceOrder></PlaceOrder>,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
]);

export default Router;
