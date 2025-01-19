import { createBrowserRouter, RouterProvider, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import GoogleCallback from "./pages/GoogleCallback";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import AddCardForm from "./pages/AddCardForm";
import "./api/axios";


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!document.cookie.split('; ').find(row => row.startsWith('ajs_anonymous_id='));
  console.log("isAuthenticated: ", isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/home" />;
};

const Layout = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const showNav = location.pathname !== "/";

  return (
    <>
      {showNav && <Nav />}
      {children}
    </>
  );
};
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/auth/google/callback", element: <GoogleCallback /> },
  {
      path: "/home",
      element: (
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
      ),
  },
  {
      path: "/addcard",
      element: (
          <ProtectedRoute>
            <Layout>
              <AddCardForm />
            </Layout>
          </ProtectedRoute>
      ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
