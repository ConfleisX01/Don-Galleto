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
import Production from "./pages/Production";
import Mermas from "./pages/Mermas";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import GetMaterials from "./pages/GetMaterials";


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
          element: <Inventory />,
        },
        {
          path: '/system/production',
          element: <Production />
        },
        {
          path: '/system/Mermas',
          element: <Mermas />
        },
        {
          path: '/system/get_materials',
          element: <GetMaterials />
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
