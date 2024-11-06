import { Navigate } from "react-router-dom";

// Pages Component

// // Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// // Dashboard
import Dashboard from "../pages/Dashboard/index";

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "admin/login", component: <Login /> },
  { path: "admin/forgot-password", component: <ForgetPwd /> },
  { path: "admin/register", component: <Register /> },
];

// const authProtectedRoutes = [
//   { path: "admin/dashboard", component: <Dashboard /> },
//
//   //   // this route should be at the end of all other routes
//   //   // eslint-disable-next-line react/display-name
//   { path: "/", exact: true, component: <Navigate to="admin/dashboard" /> },
// ];

export { publicRoutes };
