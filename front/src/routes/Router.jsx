import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../components/register/Register";
import Login from "../components/login/Login";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      /* {
        path: "/prediction",
        element: <Prediction></Prediction>,
        children: [
          {
            path: ":id",
            element: <Prediction></Prediction>,
          },
        ],
      },
      {
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
    path: "/login",
    element: <Login></Login>,
  },
]);

export default Router;
