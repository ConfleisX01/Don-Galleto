import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Root from "./pages/Root";
import Pos from "./pages/POS";

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
          path: '/system/sales',
          element: <Pos />
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
