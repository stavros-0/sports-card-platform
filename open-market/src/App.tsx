import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import GoogleCallback from "./pages/GoogleCallback";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/auth/google/callback", element: <GoogleCallback /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
