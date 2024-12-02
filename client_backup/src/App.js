import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Root from "./pages/Root";
import Report from "./pages/Report";
import Pos from "./pages/POS";
import Inventory from "./pages/Inventory";


import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={'/login'} />,
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: '/system',
      element: <Root />,
      children: [
        {
          path: '/system/dashboard',
          element: <Dashboard />
        },
        {
          path: '/system/report',
          element: <Report />
        },
        {
          path: '/system/sales',
          element: <Pos />
        },
        {
          path: '/system/inventory',
          element: <Inventory />
        }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
