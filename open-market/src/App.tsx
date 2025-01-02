import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import GoogleCallback from "./pages/GoogleCallback";
import Home from "./pages/Home";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/auth/google/callback", element: <GoogleCallback /> },
  {path: "/home", element: <Home/>}
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
