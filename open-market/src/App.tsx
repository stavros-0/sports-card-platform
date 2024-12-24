import { Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

function Root(){
  return(
    <>
    <Routes>
      
      <Route path={`/`} element={<Home />}/>
      <Route path={`/login`} element={<Login />}/>
    </Routes>
    </>
  )
}

const router = createBrowserRouter(
  [
    { path: "*", Component: Root },
  ]
);

function App() {
  

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App

