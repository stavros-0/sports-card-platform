import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import GoogleCallback from "./pages/GoogleCallback";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import AddCardForm from "./pages/AddCardForm";

const Layout = () => (
  <>
    <Nav />
    <Outlet /> 
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { path: "/", element: <Login /> },
      { path: "/auth/google/callback", element: <GoogleCallback /> },
      { path: "/home", element: <Home /> },
      {path: "/addcard", element: <AddCardForm/>}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
