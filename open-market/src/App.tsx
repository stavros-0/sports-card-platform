import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import About from "./pages/About";
import GoogleCallback from "./pages/GoogleCallback";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import AddCardForm from "./pages/AddCardForm";
import "./api/axios";

/*
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!document.cookie.split('; ').find(row => row.startsWith('ajs_anonymous_id='));
  console.log("isAuthenticated: ", isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/home" />;
};*/

const Layout = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const showNav = location.pathname !== "/";

  return (
    <div className="bg-gray-800" >
      {showNav && <Nav />}
      {children}
    </div>
  );
};
const router = createBrowserRouter([
  
  { path: "/auth/google/callback", element: <GoogleCallback /> },
  {
      path: "/home",
      element: (
          
            <Layout>
              <Home />
            </Layout>
      
    ),
  },
  {
    path: "/addcard",
    element: (
          <Layout>
            <AddCardForm />
          </Layout> 
    ),
  },
  {
    path: "/about",
    element: (
      <Layout>
        <About />
      </Layout>
    ),
  },
  ]);

export default function App() {
  return <RouterProvider router={router} />;
}


